var task = function (gulp, config) {
  'use strict';

  var manifest = require('gulp-manifest');

  gulp.task('manifest', function(){
    return gulp.src([config.dist.root + '/**/*'])
      .pipe(manifest({
        hash: true,
        prefix: '/',
        preferOnline: !global.isProd, // Prefer online in devmode
        network: ['*'],
        filename: 'app.manifest',
        include: ['http://browser-update.org/update.min.js', 'https://browser-update.org/update.min.js'],
        exclude: ['**/app.manifest']
       }))
      .pipe(gulp.dest(config.dist.approot));
  });
};

module.exports = task;
