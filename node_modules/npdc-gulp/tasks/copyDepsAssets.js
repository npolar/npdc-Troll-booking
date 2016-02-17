var task = function(gulp, config, prefix) {
  'use strict';

  var changed = require('gulp-changed');
  prefix = prefix || '';

  gulp.task(prefix + 'copy-deps-assets', function() {
    return gulp.src(config.deps.assets)
      .pipe(changed(config.dist.approot + '/assets'))
      .pipe(gulp.dest(config.dist.approot + '/assets'));
  });
};

module.exports = task;
