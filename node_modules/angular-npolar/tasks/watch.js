var task = function(gulp, config) {
  'use strict';

  var runSequence = require('run-sequence').use(gulp);

  gulp.task('watch', function() {
    gulp.watch(config.src.jsAll, function () { runSequence(['lint', 'test']);});
  });
};

module.exports = task;
