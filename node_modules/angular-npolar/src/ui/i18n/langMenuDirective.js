'use strict';

let langMenuDirective = function (NpolarLang) {
  'ngInject';

  return {
    //scope: {},
    //controller: '',
    template: require('./lang-menu.html'),
    link: function(scope) {
      scope.lang = NpolarLang;
    }
  };
};

module.exports = langMenuDirective;
