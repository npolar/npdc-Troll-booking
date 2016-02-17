var task = function(gulp, config) {
  'use strict';

  var mocha = require('gulp-mocha');
  var notify = require('gulp-notify');

  gulp.task('test', [
    ], function() {
    return gulp.src(config.tests, {
        read: false
      })
      .pipe(mocha({
        reporter: 'dot'
      }))
      .on('error', function(error) {
        notify({
          message: '<%= error.message %>',
          title: 'Gulp mocha'
        }).write(error);
        this.emit('end');
      });
  });
};

module.exports = task;
