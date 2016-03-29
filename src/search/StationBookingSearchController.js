'use strict';

var StationBookingSearchController = function ($scope, $location, $controller, StationBooking, npdcAppConfig, NpolarTranslate) {
  'ngInject';

  $controller('NpolarBaseController', { $scope: $scope });
  $scope.resource = StationBooking;
  npdcAppConfig.cardTitle = 'npdc.app.Title';
  npdcAppConfig.search.local.results.detail = function (entry) {
    return "Released: " + (entry.released ? entry.released.split('T')[0] : '-');
  };

  let query = function() {
    let defaults = { limit: "50", sort: "-updated,-released", fields: 'research_type,research_project,updated', facets: "research_type,research_project", score: true };
    let invariants = $scope.security.isAuthenticated() ? {} : { "not-draft": "yes", "not-progress": "planned", "filter-links.rel": "data" };
    return Object.assign({}, defaults, invariants);
  };

  $scope.search(query());

  $scope.$on('$locationChangeSuccess', (event, data) => {
    $scope.search(query());
  });

};

module.exports = StationBookingSearchController;
