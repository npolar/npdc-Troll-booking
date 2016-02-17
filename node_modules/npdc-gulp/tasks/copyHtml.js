var task = function(gulp, config) {
  'use strict';

  var changed = require('gulp-changed');
  var preprocess = require('gulp-preprocess');
  var errorHandler = require('../util/errorHandler')({
    plugin: 'copy',
    verbose: true
  });

  gulp.task('copy-html', ['revParse'], function() {
    return gulp.src(config.src.html)
      .pipe(changed(config.dist.approot))
      .pipe(preprocess({
        context: {
          VERSION: config.version(),
          PROD: global.isProd,
          BRANCH: global.ref,
          COMMON_VERSION: config.COMMON_VERSION
        }
      }))
      //.pipe(gulpif(global.isProd, cachebust()).on('error', errorHandler))
      .pipe(gulp.dest(config.dist.approot))
      .on('error', errorHandler);
  });
};

module.exports = task;
