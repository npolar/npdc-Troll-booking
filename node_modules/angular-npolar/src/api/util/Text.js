'use strict';

var Texxt = function() {
  'ngInject';

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  // Extract the first capture (1) for all regex matches in text
  this.extract = function(text, regex, capture_capture) {

    var extracted = [];
    var m;
    var capture_which_capture = capture_capture || 1;

    while ((m = regex.exec(text)) !== null) {
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      extracted.push(m[capture_which_capture]);
    }
    return extracted.filter(onlyUnique);
  };

};

module.exports = Texxt;
