var task = function(gulp, config) {
  'use strict';

  gulp.task('copy-all', ['copy-html', 'copy-assets', 'copy-deps-assets']);
};

module.exports = task;
