'use strict';

process.env['UV_THREADPOOL_SIZE'] = '128';
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
process.env['CP_VER'] = new Date().getTime().toString();
require('events').EventEmitter.defaultMaxListeners = 15;

/**
 * Configuration dependencies.
 */

var config = require('./config/production/config');

/**
 * Node dependencies.
 */

var path = require('path');
var lookup = {};
try {
  var MaxMindReader = require('maxmind').Reader;
  lookup = new MaxMindReader(
    require('fs').readFileSync(
      path.join(path.dirname(__filename), 'files', 'GeoLite2-Country.mmdb')
    )
  );
} catch (err) {
  console.log('NOT FILE GeoLite2-Country.mmdb');
}
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use(function(req, res, next) {
  res.setHeader('X-Powered-By', 'CinemaPress');
  next();
});

/**
 * Route dependencies.
 */

var proxy = require('./routes/proxy');
var iframe = require('./routes/iframe');
var player = require('./routes/player');
var episode = require('./routes/episode');
var robots = require('./routes/robots');
var rss = require('./routes/rss');
var admin = require('./routes/admin');
var website = require('./routes/website');

/**
 * Middleware dependencies.
 */

var userinfo = require('./lib/CP_userinfo');
var loadavg = require('./lib/CP_loadavg');
var nginx = require('./lib/CP_nginx');

/**
 * Port.
 */

var port =
  process.env.PORT || parseInt(config.nginx.addr.split(':')[1]) || 3000;

/**
 * Template engine.
 */

app.set('views', [
  path.join(__dirname, 'themes', 'default', 'views'),
  path.join(__dirname, 'themes', config.theme, 'views')
]);
app.set('view engine', 'ejs');

/**
 * Middleware functions.
 */

app.enable('trust proxy');

app.use(cookieParser());
app.use(bodyParser.json({ limit: '64mb' }));
app.use(bodyParser.urlencoded({ limit: '64mb', extended: true }));

app.use(nginx());
app.use(
  /^(?:\/mobile-version|\/tv-version|)?/,
  express.static(path.join(path.dirname(__filename), '/'))
);
app.use(userinfo(lookup));
app.use(/^(?:\/k\.1poster\.net|\/t\.1poster\.net)?/, proxy);
app.use(/^(?:\/mobile-version|\/tv-version|)?\/iframe\.player.*$/, player);
app.use(/^(?:\/mobile-version|\/tv-version|)?\/episode\.json.*$/, episode);
app.use(/^(?:\/mobile-version|\/tv-version|)?\/robots\.txt$/, robots);
app.use(/^(?:\/mobile-version|\/tv-version|)?\/iframe.*$/, iframe);
app.use(/^(?:\/mobile-version|\/tv-version|)?\/rss\.xml.*$/, rss);
app.use('/' + config.urls.admin, admin);
app.use(loadavg());
app.use(/^(?:\/mobile-version|\/tv-version|)?/, website);

app.use(function(err, req, res, next) {
  if (res.headersSent) return next();
  err.status = err.status ? err.status : 404;
  err.message = err.message ? err.message : 'Not Found';
  if (err.status === 301 || err.status === 302) {
    res.writeHead(err.status, { Location: err.message });
    return res.end();
  }
  return res.status(err.status).render('error', {
    search: config.urls.search,
    status: err.status,
    message: err.message,
    language: config.language
  });
});

app.use(function(req, res) {
  if (res.headersSent) return;
  return res.status(404).render('error', {
    search: config.urls.search,
    status: 404,
    message: 'Not Found',
    language: config.language
  });
});

app.listen(port);
