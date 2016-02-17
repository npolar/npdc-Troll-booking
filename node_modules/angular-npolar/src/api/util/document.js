'use strict';

let Entities = require('special-entities');

let documentUtil = function($filter) {
  'ngInject';

  let unescape = function(text) {
    return Entities.normalizeEntities(text, 'utf-8');
  };

  let title = function(entry) {
    let t = entry.title || entry.name || entry.code || $filter('lang')(entry.titles, 'title') || entry.id;
    t = t.split('_').join('');
    return unescape(t);
  };

  return {
    title
  };
};

module.exports = documentUtil;
