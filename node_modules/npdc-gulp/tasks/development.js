var task = function(gulp, config) {
  'use strict';

  var runSequence = require('run-sequence').use(gulp);

  gulp.task('dev', function(cb) {
    global.isProd = false;
    runSequence(['clean', 'info'], 'devCommon', 'lint', 'test',
      ['browserify', 'sass', 'copy-all', 'copy-shared-assets'], 'manifest' ,'browserSync', 'watch-all', cb);
  });
};

module.exports = task;
