'use strict';

/**
 * Configuration dependencies.
 */

var config = require('../config/production/config');
var modules = require('../config/production/modules');

/**
 * Node dependencies.
 */

var moment = require('moment');
moment.locale(config.language);

/**
 * Create full schema data for movie.
 *
 * @param {Object} page
 * @param {Object} movie
 * @param {Object} movies - The related movies.
 * @param {Object} [options]
 * @return {String}
 */

function fullMovieSchema(page, movie, movies, options) {
  if (arguments.length === 3) {
    options = {};
    options.domain = config.subdomain + '' + config.domain;
    options.origin =
      config.protocol + '' + config.subdomain + '' + config.domain;
  }

  if (!movie) return '';

  var result = [];

  if (movies) {
    for (var category in movies) {
      if (movies.hasOwnProperty(category)) {
        movies[category].forEach(function(data) {
          var schemaItemList = {};
          schemaItemList['@context'] = 'http://schema.org';
          schemaItemList['@type'] = 'ItemList';
          schemaItemList['name'] = data.name.replace(/<\/?[^>]+(>|$)/g, '');
          schemaItemList['numberOfItems'] = data.movies.length;
          schemaItemList['itemListOrder'] = 'Descending';
          schemaItemList['itemListElement'] = [];

          data.movies.forEach(function(movie, key) {
            schemaItemList['itemListElement'].push({
              '@type': 'ListItem',
              position: key + 1,
              item: onlyMovieSchema(movie, options)
            });
          });

          result.push(schemaItemList);

          return false;
        });

        break;
      }
    }
  }

  var schemaBreadcrumbList = {};

  schemaBreadcrumbList['@context'] = 'http://schema.org';
  schemaBreadcrumbList['@type'] = 'BreadcrumbList';
  schemaBreadcrumbList['itemListElement'] = [];

  schemaBreadcrumbList['itemListElement'].push({
    '@type': 'ListItem',
    position: 1,
    item: {
      '@id': '/',
      name: config.l.home,
      url: config.protocol + options.domain
    }
  });

  schemaBreadcrumbList['itemListElement'].push({
    '@type': 'ListItem',
    position: 2,
    item: {
      '@id':
        '/' +
        encodeURIComponent(config.urls.genre) +
        config.urls.slash +
        encodeURIComponent(movie.genre),
      name: movie.genre,
      url:
        config.protocol +
        options.domain +
        '/' +
        encodeURIComponent(config.urls.genre) +
        config.urls.slash +
        encodeURIComponent(movie.genre)
    }
  });

  schemaBreadcrumbList['itemListElement'].push({
    '@type': 'ListItem',
    position: 3,
    item: {
      '@id': movie.url,
      name: movie.title,
      url: movie.url
    }
  });

  if (page.url && page.url !== movie.url) {
    schemaBreadcrumbList['itemListElement'].push({
      '@type': 'ListItem',
      position: 4,
      item: {
        '@id': page.url,
        name: page.title,
        url: page.url
      }
    });
  }

  var ya_date =
    movie.custom && movie.custom.lastmod
      ? moment(movie.custom.lastmod).format('YYYY-MM-DDTHH:mm:ss')
      : moment(movie.premiere, config.default.moment).format(
          'YYYY-MM-DDTHH:mm:ss'
        );

  result.push(onlyMovieSchema(movie, options));
  result.push(schemaBreadcrumbList);

  var schema =
    '<script type="application/ld+json">' +
    JSON.stringify(result) +
    '</script>';

  var opengraph = '';
  opengraph += '<meta name="twitter:card" content="summary_large_image" />';
  opengraph +=
    '<meta property="og:site_name" content="' + config.domain + '" />';
  opengraph += '<meta property="og:title" content="' + page.title + '" />';
  opengraph +=
    '<meta property="og:description" content="' + page.description + '" />';
  opengraph +=
    movie.episode && movie.season
      ? '<meta property="og:type" content="video.episode" />' +
        '<meta property="ya:ovs:episode" content="' +
        movie.episode +
        '" />' +
        '<meta property="ya:ovs:season " content="' +
        movie.season +
        '" />'
      : '<meta property="og:type" content="video.movie" />' +
        '<meta property="ya:ovs:original_name" content="' +
        movie.title_en +
        '" />' +
        '<meta property="ya:ovs:release_date" content="' +
        ya_date +
        '" />';
  opengraph += '<meta property="og:url" content="' + page.url + '" />';
  opengraph +=
    '<meta property="og:video" content="//' +
    config.domain +
    '/iframe/' +
    movie.kp_id +
    '" />';
  opengraph +=
    '<meta property="og:video:url" content="//' +
    config.domain +
    '/iframe/' +
    movie.kp_id +
    '" />';
  opengraph += '<meta property="og:video:type" content="video/mp4" />';
  opengraph +=
    '<meta property="video:duration" content="' +
    (7777 + movie.title.length * 30) +
    '" />';
  opengraph += '<meta property="og:image" content="' + movie.picture + '" />';
  opengraph += '<meta property="og:image:width" content="600" />';
  opengraph += '<meta property="og:image:height" content="400" />';
  opengraph +=
    movie.poster.indexOf('http') + 1
      ? '<meta property="og:image" content="' + movie.poster + '" />'
      : '<meta property="og:image" content="//' +
        config.domain +
        movie.poster +
        '" />';

  opengraph += '<meta property="ya:ovs:allow_embed" content="true" />';
  opengraph += '<meta property="ya:ovs:quality" content="HD" />';
  opengraph +=
    '<meta property="ya:ovs:available_platform" content="Desktop,Mobile" />';
  opengraph +=
    '<meta property="ya:ovs:rating" content="' + movie.rating / 10 + '" />';
  opengraph += '<meta property="ya:ovs:adult" content="false" />';
  opengraph +=
    '<meta property="ya:ovs:upload_date" content="' + ya_date + '" />';

  return schema + opengraph;
}

/**
 * Create schema data for one movie.
 *
 * @param {Object} movie
 * @param {Object} [options]
 * @return {Object}
 */

function onlyMovieSchema(movie, options) {
  if (arguments.length === 2) {
    options = {};
    options.domain = config.subdomain + '' + config.domain;
    options.origin =
      config.protocol + '' + config.subdomain + '' + config.domain;
  }

  var result = {};

  result['@context'] = 'http://schema.org';
  result['@type'] = 'Movie';
  result['name'] = movie.title;
  result['alternativeHeadline'] = movie.title_en;
  result['description'] = movie.description;
  result['dateCreated'] = moment(movie.premiere, config.default.moment).format(
    'YYYY-MM-DD'
  );
  result['image'] =
    movie.poster.indexOf('http') + 1
      ? movie.poster
      : config.protocol + config.subdomain + config.domain + movie.poster;
  result['sameAs'] = movie.url;
  result['url'] = options.url || movie.url;
  result['actor'] = [];
  result['director'] = [];
  result['genre'] = [];
  result['aggregateRating'] = movie.rating
    ? {
        '@type': 'AggregateRating',
        bestRating: 10,
        ratingCount: movie.vote,
        ratingValue: movie.rating / 10
      }
    : null;

  if (movie.actors_arr) {
    movie.actors_arr.forEach(function(actor) {
      result['actor'].push({
        '@type': 'Person',
        name: actor,
        sameAs:
          config.protocol +
          options.domain +
          '/' +
          encodeURIComponent(config.urls.actor) +
          config.urls.slash +
          encodeURIComponent(actor)
      });
    });
  }

  if (movie.directors_arr) {
    movie.directors_arr.forEach(function(director) {
      result['director'].push({
        '@type': 'Person',
        name: director,
        sameAs:
          config.protocol +
          options.domain +
          '/' +
          encodeURIComponent(config.urls.director) +
          config.urls.slash +
          encodeURIComponent(director)
      });
    });
  }

  if (movie.genres_arr) {
    movie.genres_arr.forEach(function(genre) {
      result['genre'].push(genre);
    });
  }

  return result;
}

/**
 * Create schema data for category.
 *
 * @param {Object} page
 * @param {Object} movies
 * @param {Object} [options]
 * @return {String}
 */

function categorySchema(page, movies, options) {
  if (arguments.length === 2) {
    options = {};
    options.domain = config.subdomain + '' + config.domain;
    options.origin =
      config.protocol + '' + config.subdomain + '' + config.domain;
  }

  var result = [];

  var schemaItemList = {};
  var schemaBreadcrumbList = {};

  schemaItemList['@context'] = 'http://schema.org';
  schemaItemList['@type'] = 'ItemList';
  schemaItemList['name'] = page.title;
  schemaItemList['numberOfItems'] = movies.length;
  schemaItemList['itemListOrder'] = 'Descending';
  schemaItemList['itemListElement'] = [];

  movies.forEach(function(movie, key) {
    var item = onlyMovieSchema(movie, options);
    item['description'] = '';
    item['actor'] = [];
    item['url'] = page.url + '#' + (key + 1);
    schemaItemList['itemListElement'].push({
      '@type': 'ListItem',
      position: key + 1,
      item: item
    });
  });

  schemaBreadcrumbList['@context'] = 'http://schema.org';
  schemaBreadcrumbList['@type'] = 'BreadcrumbList';
  schemaBreadcrumbList['itemListElement'] = [];

  schemaBreadcrumbList['itemListElement'].push({
    '@type': 'ListItem',
    position: 1,
    item: {
      '@id': '/',
      name: config.l.home,
      url: config.protocol + options.domain
    }
  });

  schemaBreadcrumbList['itemListElement'].push({
    '@type': 'ListItem',
    position: 2,
    item: {
      '@id': page.url,
      name: page.title,
      url: page.url
    }
  });

  result.push(schemaItemList);
  result.push(schemaBreadcrumbList);

  var schema =
    '<script type="application/ld+json">' +
    JSON.stringify(result) +
    '</script>';

  var opengraph = '';
  opengraph += '<meta name="twitter:card" content="summary_large_image" />';
  opengraph +=
    '<meta property="og:site_name" content="' + config.domain + '" />';
  opengraph += '<meta property="og:title" content="' + page.title + '" />';
  opengraph +=
    '<meta property="og:description" content="' + page.description + '" />';
  opengraph += '<meta property="og:type" content="website" />';
  opengraph += '<meta property="og:url" content="' + page.url + '" />';
  opengraph +=
    '<meta property="og:image" content="//' +
    config.domain +
    config.default.image +
    '" />';
  opengraph += '<meta property="og:image:width" content="600" />';
  opengraph += '<meta property="og:image:height" content="400" />';

  var canonical = '<link rel="canonical" href="' + page.url + '"/>';

  return schema + opengraph + canonical;
}

/**
 * Create schema data for index/categories/collections page.
 *
 * @param {Object} page
 * @param {Object} [options]
 * @return {String}
 */

function generalSchema(page, options) {
  if (arguments.length === 1) {
    options = {};
    options.domain = config.subdomain + '' + config.domain;
    options.origin =
      config.protocol + '' + config.subdomain + '' + config.domain;
  }

  var result = {};

  result['@context'] = 'http://schema.org';
  result['@type'] = 'WebSite';
  result['name'] = page.title;
  result['url'] = config.protocol + options.domain;
  result['potentialAction'] = {
    '@type': 'SearchAction',
    target:
      config.protocol +
      options.domain +
      '/' +
      config.urls.search +
      '?q={query}',
    'query-input': 'required name=query'
  };
  if (modules.social.status) {
    result['sameAs'] = [];
    if (modules.social.data.vk) {
      result['sameAs'].push(modules.social.data.vk);
    }
    if (modules.social.data.facebook) {
      result['sameAs'].push(modules.social.data.facebook);
    }
    if (modules.social.data.twitter) {
      result['sameAs'].push(modules.social.data.twitter);
    }
    if (modules.social.data.telegram) {
      result['sameAs'].push(modules.social.data.telegram);
    }
    if (modules.social.data.instagram) {
      result['sameAs'].push(modules.social.data.instagram);
    }
    if (modules.social.data.youtube) {
      result['sameAs'].push(modules.social.data.youtube);
    }
  }

  var schema =
    '<script type="application/ld+json">' +
    JSON.stringify(result) +
    '</script>';

  var opengraph = '';
  opengraph += '<meta name="twitter:card" content="summary_large_image" />';
  opengraph +=
    '<meta property="og:site_name" content="' + config.domain + '" />';
  opengraph += '<meta property="og:title" content="' + page.title + '" />';
  opengraph +=
    '<meta property="og:description" content="' + page.description + '" />';
  opengraph += '<meta property="og:type" content="website" />';
  opengraph +=
    '<meta property="og:url" content="' +
    config.protocol +
    options.domain +
    '" />';
  opengraph +=
    '<meta property="og:image" content="//' +
    config.domain +
    config.default.image +
    '" />';
  opengraph += '<meta property="og:image:width" content="600" />';
  opengraph += '<meta property="og:image:height" content="400" />';

  return schema + opengraph;
}

/**
 * Create schema data for one content.
 *
 * @param {Object} content
 * @param {Object} [options]
 * @return {Object}
 */

function contentSchema(content, options) {
  if (arguments.length === 1) {
    options = {};
    options.domain = config.subdomain + '' + config.domain;
    options.origin =
      config.protocol + '' + config.subdomain + '' + config.domain;
  }

  var result = {};

  result['@context'] = 'http://schema.org';
  result['@type'] = 'NewsArticle';
  result['headline'] = content.title;
  result['name'] = content.title;
  result['author'] = config.protocol + config.subdomain + config.domain;
  result['publisher'] = {
    '@type': 'Organization',
    name: config.subdomain + config.domain,
    logo: {
      '@type': 'ImageObject',
      url:
        config.protocol +
        config.subdomain +
        config.domain +
        config.default.image
    }
  };
  result['description'] = content.description_short;
  result['datePublished'] = moment(
    content.publish,
    config.default.moment
  ).format('YYYY-MM-DD');
  result['dateModified'] = moment(
    content.publish,
    config.default.moment
  ).format('YYYY-MM-DD');
  result['image'] =
    content.image.indexOf('http') + 1
      ? content.image
      : config.protocol + config.subdomain + config.domain + content.image;
  result['sameAs'] = content.url;
  result['url'] = options.url || content.url;
  result['mainEntityOfPage'] = {
    '@type': 'WebPage',
    '@id': options.url || content.url
  };

  var schema =
    '<script type="application/ld+json">' +
    JSON.stringify(result) +
    '</script>';

  var opengraph = '';
  opengraph += '<meta name="twitter:card" content="summary_large_image" />';
  opengraph +=
    '<meta property="og:site_name" content="' + config.domain + '" />';
  opengraph += '<meta property="og:title" content="' + content.title + '" />';
  opengraph +=
    '<meta property="og:description" content="' +
    content.description_short +
    '" />';
  opengraph += '<meta property="og:type" content="website" />';
  opengraph += '<meta property="og:url" content="' + result['url'] + '" />';
  opengraph += '<meta property="og:image" content="' + result['image'] + '" />';
  opengraph += '<meta property="og:image:width" content="600" />';
  opengraph += '<meta property="og:image:height" content="400" />';

  return schema + opengraph;
}

module.exports = {
  fullMovie: fullMovieSchema,
  category: categorySchema,
  general: generalSchema,
  content: contentSchema
};
