/**
 * Adapted from [Stackoverflow?]...
 *
 */
'use strict';

var jsonText = function() {
  'ngInject';

  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attr, ngModel) {
      function into(input) {
        //console.log(JSON.parse(input));
        return JSON.parse(input);
      }
      function out(data) {
        return JSON.stringify(data);
      }
      ngModel.$parsers.push(into);
      ngModel.$formatters.push(out);
    }
  };
};

module.exports = jsonText;
