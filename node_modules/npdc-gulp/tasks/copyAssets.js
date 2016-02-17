var task = function (gulp, config) {
  'use strict';

  var changed = require('gulp-changed');

  gulp.task('copy-assets', function() {
    return gulp.src(config.src.assets)
      .pipe(changed(config.dist.approot))
      .pipe(gulp.dest(config.dist.approot));
  });
};

module.exports = task;
