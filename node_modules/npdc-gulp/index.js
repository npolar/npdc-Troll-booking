'use strict';

var fs = require('fs');
var onlyScripts = require('./util/scriptFilter');
var path = require('path');
var tasks = fs.readdirSync(path.resolve(__dirname, './tasks/')).filter(onlyScripts);
var baseConfig = require('./config');

var loadTasks = function(gulpInstance, options) {
  baseConfig = baseConfig.extend(options);
  tasks.forEach(function(task) {
    require('./tasks/' + task)(gulpInstance, baseConfig);
  });
};

var loadAppTasks = function(gulpInstance, options) {
  loadTasks(gulpInstance, options);
  gulpInstance.task('default', ['dev']);
};

var loadModuleTasks = function(gulpInstance, options) {
  loadTasks(gulpInstance, options);
  gulpInstance.task('watch', function () {
    return gulpInstance.watch([].concat(baseConfig.src.js, baseConfig.tests), ['lint', 'test']);
  });
  gulpInstance.task('default', ['lint', 'test', 'watch']);
};

module.exports = {
  loadAppTasks: loadAppTasks,
  loadModuleTasks: loadModuleTasks,
  baseConfig: baseConfig
};
