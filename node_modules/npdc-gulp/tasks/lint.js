var task = function (gulp, config) {
    'use strict';

    var jshint = require('gulp-jshint');
    var fs = require('fs');
    var path = require('path');
    var notify = require('gulp-notify');

    var jshintrc = JSON.parse(fs.readFileSync(path.join(__dirname, '../.jshintrc')));

    gulp.task('lint', function () {
        return gulp.src(config.src.js)
          .pipe(jshint(jshintrc))
          .pipe(jshint.reporter('jshint-stylish'))
      .pipe(notify(function (file) {
          if (file.jshint.success) {
              return false;
          }

          return {
            message: file.relative + " (" + file.jshint.results.length + " errors) See console.",
            title: 'Gulp jshint'};
      }));
        //.pipe(jshint.reporter('fail'));
    });
};

module.exports = task;
