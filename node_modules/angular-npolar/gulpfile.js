'use strict';

var fs = require('fs');
var path = require('path');
var tasks = fs.readdirSync(path.resolve(__dirname, './tasks/'))
  .filter(function (name) { return /(\.(js)$)/i.test(path.extname(name));});
var gulp = require('gulp');
var runSequence = require('run-sequence');

var readPackageJson = function () {
  return JSON.parse(fs.readFileSync('./package.json'), 'utf8');
};

var src = 'src',
  deps = 'node_modules';

var config = {
  version: function () {return readPackageJson().version;},

  'src': {
    'root': src,
    'html': [src+'/**/*.html'],
    'jsAll': [src+'/**/*.js'],
    'jsNoTests': [src+'/**/*!(Spec).js']
  },

  'deps': {
    'root': deps
  },

  'tests': ['src/**/*Spec.js']
};
tasks.forEach(function(task) {
  require('./tasks/' + task)(gulp, config);
});

gulp.task('default', function (cb) {
  runSequence('info', 'lint', 'test', 'watch', cb);
});
