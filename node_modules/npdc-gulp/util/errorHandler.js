'use strict';
var notify = require('gulp-notify');

module.exports = function(options) {
  return function(error) {
    notify({
      message: options.verbose ? '<%= error %>' : '<%= error.message %>',
      title: 'Gulp ' + options.plugin
    }).write(error);
    this.emit('end');
  };
};
