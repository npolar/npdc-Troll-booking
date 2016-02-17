'use strict';

module.exports = function() {
  'ngInject';

  return function(input) {
    if ((/^\d{4}\-\d{2}\d{2}T/).test(input)) {
      return input.split("T")[0];
    } else {
      return input;
    }
  };
};
