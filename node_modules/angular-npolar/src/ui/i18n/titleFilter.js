'use strict';

let titleFilter = function(NpolarTranslate, NpolarLang) {
  'ngInject';

  let filter =  function(titles, tkey = { value: 'title', language: 'lang' }) {
    if (!titles || titles.length === 0) {
      return;
    }
    // @todo Autodetect keys
    return NpolarTranslate.value(titles, NpolarLang.getLang(), null, null, tkey);
  };

  //filter.$stateful=true;
  return filter;

};
module.exports = titleFilter;
