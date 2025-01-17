'use strict';

/**
 * Module dependencies.
 */

var CP_structure = require('../../lib/CP_structure');
var CP_get = require('../../lib/CP_get.min');

/**
 * Configuration dependencies.
 */

var config = require('../../config/production/config');
var modules = require('../../config/production/modules');

/**
 * Node dependencies.
 */

var moment = require('moment');
moment.locale(config.language);

/**
 * Callback.
 *
 * @callback Callback
 * @param {Object} err
 * @param {Object} [render]
 */

/**
 * Getting the data to render all sitemaps page.
 *
 * @param {Object} options
 * @param {Callback} callback
 */

function allSitemap(options, callback) {
  var query = {};
  query['year'] = '!_empty';
  return CP_get.movies(query, -2, 'kinopoisk-vote-up', 1, false, function(
    err,
    movies
  ) {
    if (err) return callback(err);

    var render = {};
    render.sitemaps = [];

    var categories = CP_structure.categories('year', movies, options);

    var y = new Date().getFullYear() + '';

    for (var year in categories) {
      if (categories.hasOwnProperty(year)) {
        if (categories[year].title === y) y = 0;
        render.sitemaps[render.sitemaps.length] = categories[year].url.replace(
          config.domain + '/' + config.urls.year + config.urls.slash,
          config.domain +
            '/' +
            config.urls.sitemap +
            '/' +
            config.urls.year +
            '/'
        );
      }
    }

    if (y) {
      render.sitemaps.unshift(
        config.protocol +
          config.subdomain +
          config.domain +
          '/' +
          config.urls.sitemap +
          '/' +
          config.urls.year +
          '/' +
          y
      );
    }

    var c = [
      config.urls.year,
      config.urls.genre,
      config.urls.country,
      config.urls.actor,
      config.urls.director,
      config.urls.type,
      modules.content.data.url
    ];

    for (var cat in c) {
      if (c.hasOwnProperty(cat) && c[cat]) {
        render.sitemaps[render.sitemaps.length] =
          config.protocol +
          config.subdomain +
          config.domain +
          '/' +
          config.urls.sitemap +
          '/' +
          c[cat];
      }
    }

    if (options.debug) {
      options.debug.detail.push({
        type: 'sitemaps',
        duration: new Date() - options.debug.duration.current + 'ms'
      });
      options.debug.duration.current = new Date();
    }

    return callback(null, render);
  });
}

/**
 * Getting the data to render one sitemap page.
 *
 * @param {String} type
 * @param {number} year
 * @param {Object} options
 * @param {Callback} callback
 */

function oneSitemap(type, year, options, callback) {
  year = year ? parseInt(year) : 0;

  switch (type) {
    case config.urls.year:
      return year
        ? getMovies(year, function(err, render) {
            return err ? callback(err) : callback(null, render);
          })
        : getCategories('year', function(err, render) {
            return err ? callback(err) : callback(null, render);
          });
    case config.urls.genre:
      getCategories('genre', function(err, render) {
        return err ? callback(err) : callback(null, render);
      });
      break;
    case config.urls.country:
      getCategories('country', function(err, render) {
        return err ? callback(err) : callback(null, render);
      });
      break;
    case config.urls.actor:
      getCategories('actor', function(err, render) {
        return err ? callback(err) : callback(null, render);
      });
      break;
    case config.urls.director:
      getCategories('director', function(err, render) {
        return err ? callback(err) : callback(null, render);
      });
      break;
    case config.urls.type:
      getTypes(function(err, render) {
        return err ? callback(err) : callback(null, render);
      });
      break;
    case modules.content.data.url:
      getContents(function(err, render) {
        return err ? callback(err) : callback(null, render);
      });
      break;
    default:
      getCategories('year', function(err, render) {
        return err ? callback(err) : callback(null, render);
      });
  }

  function getTypes(callback) {
    var render = {};
    render.urls = [];

    var types = [
      config.urls.types.movie,
      config.urls.types.serial,
      config.urls.types.anime,
      config.urls.types.mult,
      config.urls.types.tv
    ];

    for (var i = 0; i < types.length; i++) {
      render.urls[render.urls.length] = {
        loc:
          config.protocol +
          config.subdomain +
          config.domain +
          '/' +
          config.urls.type +
          config.urls.slash +
          encodeURIComponent(types[i])
      };
    }

    callback(null, render);
  }

  function getCategories(category, callback) {
    var query = {};
    query[category] = '!_empty';
    return CP_get.movies(query, -2, 'kinopoisk-vote-up', 1, false, function(
      err,
      movies
    ) {
      if (err) return callback(err);

      var render = {};
      render.urls = [];

      var categories = CP_structure.categories(category, movies, options);

      for (var year in categories) {
        if (categories.hasOwnProperty(year)) {
          render.urls[render.urls.length] = {
            loc: categories[year].url
          };
        }
      }

      if (options.debug) {
        options.debug.detail.push({
          type: 'sitemapCategory',
          duration: new Date() - options.debug.duration.current + 'ms'
        });
        options.debug.duration.current = new Date();
      }

      return callback(null, render);
    });
  }

  /**
   * Get contents.
   *
   * @param {Callback} callback
   */

  function getContents(callback) {
    var render = {};
    render.urls = [];

    CP_get.contents({}, 500, 1, true, options, function(err, contents) {
      if (err) return callback(err);

      var render = {};
      render.urls = [];

      for (var content in contents) {
        if (contents.hasOwnProperty(content)) {
          render.urls[render.urls.length] = {
            loc: contents[content].url,
            lastmod: moment(
              contents[content].publish,
              config.default.moment
            ).format('YYYY-MM-DD')
          };
        }
      }

      if (options.debug) {
        options.debug.detail.push({
          type: 'sitemapContent',
          duration: new Date() - options.debug.duration.current + 'ms'
        });
        options.debug.duration.current = new Date();
      }

      return callback(null, render);
    });
  }

  /**
   * Get movies.
   *
   * @param {String} year
   * @param {function(*=, *=): *} callback
   */

  function getMovies(year, callback) {
    CP_get.movies(
      { year: year },
      -1,
      'kinopoisk-vote-up',
      1,
      true,
      options,
      function(err, movies) {
        if (options.debug) {
          options.debug.detail.push({
            type: 'sitemapMovies',
            duration: new Date() - options.debug.duration.current + 'ms'
          });
          options.debug.duration.current = new Date();
        }

        if (err) return callback(err);

        if (movies && movies.length) {
          var render = {};
          render.urls = [];

          for (var i = 0; i < movies.length; i++) {
            if (
              !config.urls.noindex ||
              !(
                movies[i].url.indexOf(
                  '/' + config.urls.noindex + config.urls.slash
                ) + 1
              )
            ) {
              render.urls[render.urls.length] = {
                loc: movies[i].url,
                lastmod:
                  movies[i].custom && movies[i].custom.lastmod
                    ? movies[i].custom.lastmod.substr(0, 10)
                    : ''
              };
            }
          }

          callback(null, render);
        } else {
          callback(null, { urls: [] });
        }
      }
    );
  }
}

module.exports = {
  all: allSitemap,
  one: oneSitemap
};
