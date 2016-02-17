var task = function(gulp, config) {
  'use strict';

  var gutil = require('gulp-util');
  var fs = require('fs');
  var path = require('path');

  gulp.task('watch-html', function() {
    return gulp.watch(config.src.html, ['copy-html']);
  });

  gulp.task('watch-assets', function() {
    return gulp.watch(config.src.assets, ['copy-assets']);
  });

  gulp.task('watch-views', function() {
    return gulp.watch(config.src.views, ['views']);
  });

  gulp.task('watch-test', function() {
    return gulp.watch([].concat(config.src.js, config.tests), ['lint', 'test']);
  });

  gulp.task('watch-sass', function () {
    return gulp.watch(config.src.sassAll, ['sass']);
  });

  gulp.task('watch-deps', function(cb) {
    fs.readdirSync(config.deps.root).forEach(function(file) {
      var stats = fs.lstatSync(path.join(config.deps.root, file));
      if (stats.isSymbolicLink()) {
        config.deps.assets.forEach(function(glob) {
          if (glob.indexOf(file) > -1) {
            gulp.watch(glob, ['copy-deps-assets']);
          }
        });
        config.deps.sharedAssets.forEach(function(glob) {
          if (glob.indexOf(file) > -1) {
            gulp.watch(glob, ['copy-shared-assets']);
          }
        });
        config.deps.views.forEach(function(glob) {
          if (glob.indexOf(file) > -1) {
            gulp.watch(glob, ['views']);
          }
        });
        gutil.log('Watching npm linked asset ' + file + ' for changes');
      }
    });
    cb();
  });

  gulp.task('watch-all', ['watch-html', 'watch-sass', 'watch-assets', 'watch-views', 'watch-test', 'watch-deps']);
};

module.exports = task;
