'use strict';

module.exports = ($log) => {
  'ngInject';

  return function(texts, prop) {
  if (texts === undefined) {
    return '';
  }
  let text = texts.find(t => { return (t.lang === 'en'); });
  if (text[prop]) {
    return text[prop];
  } else {
    return texts[0][prop];
  }
  };
};
