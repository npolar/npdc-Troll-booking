var task = function (gulp, config) {
    'use strict';

    // Registers gulp task
    gulp.task('browserify', ['views'], function () {
      var gulpif = require('gulp-if');
      var gutil = require('gulp-util');
      var sourcemaps = require('gulp-sourcemaps');
      var source = require('vinyl-source-stream');
      var buffer = require('vinyl-buffer');
      var watchify = require('watchify');
      var browserify = require('browserify');
      var uglify = require('gulp-uglify');
      var glob = require('glob');
      var _ = require('lodash');
      var errorHandler = require('../util/errorHandler')({plugin: 'browserify', verbose: true});
      var resolutions = require('browserify-resolutions');

      var app = glob.sync('./' + config.src.app);
      var bundle;

      var bundler = browserify({
          // Our app main
          entries: [require.resolve('babel-polyfill'), app],
          // Enable source maps
          debug: true
      }, watchify.args).plugin(resolutions, ['angular']);

      bundler.on('log', gutil.log);

      var templateCache = '/tmp/npdc-gulp/' + config.name + '/templates.js';
      gutil.log("templateCache", templateCache);
      bundler.add(templateCache);

      if (global.isProd) {
        bundler.external(['npdc-common', 'angular']);
      }

      bundle = function (ids) {
          var bundleName = config.dist.bundleName || _.last(app[0].split('/'));
          gutil.log('Bundling', ids instanceof Array ? ids : '');

          // Browseriy
          return bundler.bundle()
            // log errors if they happen
            .on('error', errorHandler)
            .pipe(source(bundleName))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(gulpif(global.isProd, uglify({ compress: { drop_console: true } })))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(config.dist.approot));
      };

      // Watch for changes and rebuild
      if (!global.isProd) {
          bundler = watchify(bundler);
          bundler.on('update', function (ids) {
              // Ignore package.json updates
              if (ids.length === 1 && /package\.json$/.test(ids[0])) {
                  return;
              }
              return bundle(ids);
          });
      }

      return bundle();
    });
};

module.exports = task;
