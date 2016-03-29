'use strict';

var environment = require('../environment');
var npdcCommon = require('npdc-common');
var AutoConfig = npdcCommon.AutoConfig;

var angular = require('angular');
require('npdc-common/src/wrappers/leaflet');

var npdcStationBookingApp = angular.module('npdcStationBookingApp', ['npdcCommon', 'leaflet']);

npdcStationBookingApp.controller('StationBookingShowController', require('./show/StationBookingShowController'));
npdcStationBookingApp.controller('StationBookingSearchController', require('./search/StationBookingSearchController'));
npdcStationBookingApp.controller('StationBookingEditController', require('./edit/StationBookingEditController'));
npdcStationBookingApp.directive('dataCoverage', require('./edit/coverage/coverageDirective'));

// Bootstrap ngResource models using NpolarApiResource
var resources = [
  {'path': '/', 'resource': 'NpolarApi'},
  {'path': '/user', 'resource': 'User'},
   {'path': '/station-booking', 'resource': 'StationBooking' }

];

resources.forEach(service => {
  // Expressive DI syntax is needed here
  npdcStationBookingApp.factory(service.resource, ['NpolarApiResource', function (NpolarApiResource) {
  return NpolarApiResource.resource(service);
  }]);
});

// Routing
npdcStationBookingApp.config(require('./router'));

// API HTTP interceptor
npdcStationBookingApp.config($httpProvider => {
  $httpProvider.interceptors.push('npolarApiInterceptor');
});

// Inject npolarApiConfig and run
npdcStationBookingApp.run(($http, npolarApiConfig, npdcAppConfig, NpolarTranslate, NpolarLang) => {
  console.log(environment);
  console.log("-------------------------");
  var autoconfig = new AutoConfig(environment);
  angular.extend(npolarApiConfig, autoconfig, { resources });

  // i18n
  $http.get('//api.npolar.no/text/?q=&filter-bundle=npdc-station-booking&format=json&variant=array&limit=all').then(response => {
    NpolarTranslate.appendToDictionary(response.data);
    NpolarLang.setLanguages(npdcAppConfig.i18n.languages);
  });

  npdcAppConfig.toolbarTitle = 'Station booking statistics';
  console.debug("npolarApiConfig", npolarApiConfig);
});
