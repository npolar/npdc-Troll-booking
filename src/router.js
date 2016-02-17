'use strict';

var router = function($routeProvider, $locationProvider) {
  'ngInject';

  $locationProvider.html5Mode(true).hashPrefix('!');

  $routeProvider.when('/:id', {
    templateUrl: 'show/show-troll-booking.html',
    controller: 'TrollBookingShowController'
  }).when('/:id/edit', {
    template: '<npdc:formula></npdc:formula>',
    controller: 'TrollBookingEditController'
  }).when('/', {
    templateUrl: 'search/search.html',
    controller: 'TrollBookingSearchController',
    reloadOnSearch: false
  });
};

module.exports = router;
