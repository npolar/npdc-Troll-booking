'use strict';

var router = function($routeProvider, $locationProvider) {
  'ngInject';

  $locationProvider.html5Mode(true).hashPrefix('!');

  $routeProvider.when('/:id', {
    templateUrl: 'show/show-station-booking.html',
    controller: 'StationBookingShowController'
  }).when('/:id/edit', {
    template: '<npdc:formula></npdc:formula>',
    controller: 'StationBookingEditController'
  }).when('/', {
    templateUrl: 'search/search.html',
    controller: 'StationBookingSearchController',
    reloadOnSearch: false
  });
};

module.exports = router;
