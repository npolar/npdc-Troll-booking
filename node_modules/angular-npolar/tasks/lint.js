var task = function(gulp, config) {
  'use strict';

  var jshint = require('gulp-jshint');
  var notify = require('gulp-notify');

  gulp.task('lint', function() {
    return gulp.src(config.src.jsAll)
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'))
      .pipe(notify(function (file) {
        if (file.jshint.success) {
          return false;
        }

        var errors = file.jshint.results.map(function (data) {
          if (data.error) {
            return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
          }
        }).join("\n");
        return {
          message: file.relative + " (" + file.jshint.results.length + " errors)\n" + errors,
          title: 'Gulp jshint'};
      }));
      //.pipe(jshint.reporter('fail'));
  });
};

module.exports = task;
