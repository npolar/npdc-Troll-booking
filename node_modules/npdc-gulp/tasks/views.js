var task = function(gulp, config) {
  'use strict';

  var addsrc = require('gulp-add-src');
  var templateCache = require('gulp-angular-templatecache');
  var path = require('path');

  gulp.task('views', function () {
    // Concatenates and registers AngularJS templates in the $templateCache
    // TODO: Let angular-npolar handle this internally ?
    return gulp.src(config.deps.views, { base: path.join(process.cwd(), config.deps.root, '/') })
      .pipe(addsrc(config.src.views))
      .pipe(templateCache({ moduleSystem: 'Browserify', standalone: true, root: config.templateRoot }))
      .pipe(gulp.dest('/tmp/npdc-gulp/'+config.name));
  });
};

module.exports = task;
