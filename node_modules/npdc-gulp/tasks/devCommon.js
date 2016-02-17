var task = function(gulp, config) {
  'use strict';

  var _ = require('lodash');
  var runSequence = require('run-sequence').use(gulp);
  var changed = require('gulp-changed');
  var taskPrefix = 'common-'; // To not overwrite tasks.

  var getConfig = function () {
    var baseConfig = JSON.parse(JSON.stringify(config));
    baseConfig.src.root = './node_modules/npdc-common/src';
    baseConfig.dist.root = './node_modules/npdc-common/dist';
    baseConfig.pkg = {};
    var commonConfig = require(process.cwd() + '/node_modules/npdc-common/config.js')(baseConfig);
    return _.deepExtend(baseConfig, commonConfig);
  };

  gulp.task(taskPrefix + 'copy-assets', function() {
    var commonConfig = getConfig();
    return gulp.src(commonConfig.src.assets, { ignore: '**/demo/**' })
      .pipe(changed(commonConfig.dist.sharedAssets))
      .pipe(gulp.dest(commonConfig.dist.sharedAssets));
  });

  gulp.task('devCommon', function (cb) {
    var commonConfig = getConfig();
    require('./sass')(gulp, commonConfig, taskPrefix);
    require('./copyDepsAssets')(gulp, commonConfig, taskPrefix);
    require('./copySharedAssets')(gulp, commonConfig, taskPrefix);
    runSequence(taskPrefix+'sass', taskPrefix+'copy-assets',
      taskPrefix+'copy-deps-assets', taskPrefix+'copy-shared-assets', cb);
  });
};

module.exports = task;
