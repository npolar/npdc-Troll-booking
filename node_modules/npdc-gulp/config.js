'use strict';
var fs = require('fs');
var _ = require('lodash');
var deepExtend = require('underscore-deep-extend');
_.mixin({
  deepExtend: deepExtend(_)
});

var readPackageJson = function() {
  return JSON.parse(fs.readFileSync('./package.json'), 'utf8');
};

// Expecting names to be "npdc-appname"
var appName = readPackageJson().name.split('npdc-')[1] || "",
  src = 'src',
  deps = 'node_modules',
  dist = 'dist';

var config = {
  'pkg': readPackageJson(),
  'pkgname': readPackageJson().name,
  'version': function() {
    return readPackageJson().version;
  },
  'name': appName,
  'COMMON_VERSION': 'master-latest',

  'dist': {
    'root': dist,
    'approot': dist + '/' + appName,
    'sass': dist + '/' + appName,
    'sharedAssets': dist + '/assets'
  },

  'src': {
    'root': src,
    'app': src + '/*app.js',
    'html': [src + '/index.html'],
    'views': [src + '/*/**/!(index)*.html'],
    'js': [src + '/**/*.{js,json}'],
    'jsNoTests': [src + '/**/!(*Spec).js'],
    'css': [src + '/**/*.css'],
    'sassMain': [src + '/main.scss'],
    'sassAll': [src + '/**/*.scss'],
    'assets': [src + '/**/*.{ico,png,jpg,jpeg,gif}', src + '/**/*.json'],
  },

  'deps': {
    'root': deps,
    'css': [],
    'views': [deps + '/angular-npolar/src/ui/**/*.html', deps + '/npdc-common/src/**/!(index)*.html'],
    'assets': [],
    'sharedAssets': [deps + '/npdc-common/dist/assets/**/*']
  },

  'tests': ['src/**/*Spec.js'],
  'dirListings': false,
  'appCache': false,
  extend: function(cnf) {
    return _.deepExtend(this, cnf);
  }
};


module.exports = config;
