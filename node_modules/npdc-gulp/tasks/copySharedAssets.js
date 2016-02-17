var task = function(gulp, config, prefix) {
  'use strict';

  var changed = require('gulp-changed');
  prefix = prefix || '';

  gulp.task(prefix + 'copy-shared-assets', function() {
    return gulp.src(config.deps.sharedAssets)
      .pipe(changed(config.dist.sharedAssets))
      .pipe(gulp.dest(config.dist.sharedAssets));
  });
};

module.exports = task;
