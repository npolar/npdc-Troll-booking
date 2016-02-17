var task = function(gulp, config) {
  'use strict';
  var mocha = require('gulp-mocha');
  require('babel-register')({
    presets: 'es2015'
  });
  var errorHandler = require('../util/errorHandler')({plugin: 'mocha', verbose: true});

  // @FIXME istanbul messes up line number reporting in tests. So disabeling for now
  // var istanbul = require('gulp-istanbul');

  // gulp.task('pre-test', function() {
  //   return gulp.src(config.src.jsNoTests)
  //     // Covering files
  //     .pipe(istanbul({includeUntested: true}).on('error', errorHandler))
  //     // Force `require` to return covered files
  //     .pipe(istanbul.hookRequire());
  // });

  gulp.task('test', [//'pre-test'
    ], function() {
    return gulp.src(config.tests, {
        read: false
      })
      // gulp-mocha needs filepaths so you can't have any plugins before it
      .pipe(mocha({
        reporter: 'dot',
      }))
      // .pipe(istanbul.writeReports({
      //    reporters: ['text-summary', 'lcov']
      // }))
      .on('error', errorHandler);
  });
};

module.exports = task;
