'use strict';

// A simple translation filter (t)
let translateFilter = function(NpolarTranslate, NpolarLang) {
  'ngInject';

  let tFilter = function(code, lang=NpolarLang.getLang()) {
  return NpolarTranslate.translate(code, lang);
  };

  tFilter.$stateful = true;
  // A stateful filter is unpure and "strongly discouraged" by https://docs.angularjs.org/guide/filter
  // However this makes usage much easier: the view does not need to provide translation language as filter parameter,
  // *and* translations are auto-updated on lang change

  return tFilter;

};
module.exports = translateFilter;
