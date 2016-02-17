var task = function(gulp, config) {
  'use strict';

  var runSequence = require('run-sequence').use(gulp);

  gulp.task('prod', function(cb) {
    global.isProd = true;

    // Work around for hanging process. All tasks finish but gulp don't.
    gulp.on('stop', function() {
      process.nextTick(function() {
        process.exit(0);
      });
    });
    runSequence(['clean', 'info'], 'lint', 'test', ['sass', 'browserify', 'copy-all', 'copy-shared-assets'], 'manifest', cb);
  });
};

module.exports = task;
