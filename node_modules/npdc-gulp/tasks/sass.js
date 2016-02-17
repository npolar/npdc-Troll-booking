var task = function(gulp, config, prefix) {
  'use strict';

  var sass = require('gulp-sass');
  var cssGlobbing = require('gulp-css-globbing');
  var es = require('event-stream');
  var concat = require('gulp-concat');
  var notify = require('gulp-notify');
  var gulpif = require('gulp-if');
  var rename = require('gulp-rename');
  var minifyCss = require('gulp-minify-css');
  var sourcemaps = require('gulp-sourcemaps');

  prefix = prefix || '';

  gulp.task(prefix + 'sass', ['revParse'], function () {
    var cssFiles = gulp.src([].concat(config.deps.css, config.src.css));
    var compiledFiles = gulp.src(config.src.sassMain)
      .pipe(cssGlobbing({extensions: ['.scss']}))
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(sourcemaps.write());

    return es.concat(cssFiles, compiledFiles)
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(concat(config.pkgname + '-' + config.version().split('.')[0] + '.css'))
      .pipe(gulpif(global.isProd, minifyCss()))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(config.dist.sass)).pipe(rename(config.pkgname + '-' + global.ref + '-latest.css'))
      .pipe(gulp.dest(config.dist.sass)).pipe(rename(config.pkgname + '.css')).pipe(gulp.dest(config.dist.sass))
      .on('error', notify.onError({message: '<%= error.message %>', title: 'Gulp sass'}));
  });


};

module.exports = task;
