'use strict';

var environment = require('../environment');
var npdcCommon = require('npdc-common');
var AutoConfig = npdcCommon.AutoConfig;

var angular = require('angular');
require('npdc-common/src/wrappers/leaflet');

var npdcTrollBookingApp = angular.module('npdcTrollBookingApp', ['npdcCommon', 'leaflet']);

npdcTrollBookingApp.controller('TrollBookingShowController', require('./show/TrollBookingShowController'));
npdcTrollBookingApp.controller('TrollBookingSearchController', require('./search/TrollBookingSearchController'));
npdcTrollBookingApp.controller('TrollBookingEditController', require('./edit/TrollBookingEditController'));
npdcTrollBookingApp.directive('dataCoverage', require('./edit/coverage/coverageDirective'));

// Bootstrap ngResource models using NpolarApiResource
var resources = [
  {'path': '/', 'resource': 'NpolarApi'},
  {'path': '/user', 'resource': 'User'},
   {'path': '/troll-booking', 'resource': 'TrollBooking' }

];

resources.forEach(service => {
  // Expressive DI syntax is needed here
  npdcTrollBookingApp.factory(service.resource, ['NpolarApiResource', function (NpolarApiResource) {
  return NpolarApiResource.resource(service);
  }]);
});

// Routing
npdcTrollBookingApp.config(require('./router'));

// API HTTP interceptor
npdcTrollBookingApp.config($httpProvider => {
  $httpProvider.interceptors.push('npolarApiInterceptor');
});

// Inject npolarApiConfig and run
npdcTrollBookingApp.run(($http, npolarApiConfig, npdcAppConfig, NpolarTranslate, NpolarLang) => {
  console.log(environment);
  var autoconfig = new AutoConfig(environment);
  angular.extend(npolarApiConfig, autoconfig, { resources });

  // i18n
  $http.get('//api.npolar.no/text/?q=&filter-bundle=npdc-troll-booking&format=json&variant=array&limit=all').then(response => {
    NpolarTranslate.appendToDictionary(response.data);
    NpolarLang.setLanguages(npdcAppConfig.i18n.languages);
  });

  npdcAppConfig.toolbarTitle = 'Troll booking';
  console.debug("npolarApiConfig", npolarApiConfig);
});
