'use strict';
var angular = require('angular');

require('angular-resource');
require('angular-utf8-base64');
require('angular-jwt');
require('angular-animate');
require('angular-aria');
require('angular-material');
require('angular-route');

var ngNpolar = angular.module('ngNpolar', ['ngResource', 'ngMaterial', 'ngRoute', 'utf8-base64', 'angular-jwt']);

require('./api');
require('./ui');
require('./service');

ngNpolar.factory('NpolarMessage', require('./events/Message'));

// change-a-path-without-reloading-the-controller
// http://stackoverflow.com/a/24102139/1357822
ngNpolar.run(['$route', '$rootScope', '$location', function($route, $rootScope, $location) {
  var original = $location.search;
  $location.search = function(params, reload) {
    if (reload === false) {
      var lastRoute = $route.current;
      var un = $rootScope.$on('$locationChangeSuccess', function() {
        $route.current = lastRoute;
        un();
      });
    }
    if (params) {
      return original.call($location, params);
    } else {
      return original.call($location);
    }
  };
}]);
