'use strict';

var StationBookingSearchController = function($scope, $location, $controller, $filter, StationBooking, npdcAppConfig, NpolarTranslate) {
  'ngInject';

  $controller('NpolarBaseController', {
    $scope: $scope
  });
  $scope.resource = StationBooking;

  npdcAppConfig.search.local.results.detail = function(entry) {
    return NpolarTranslate.translate("Released: ") + (entry.released ? $filter('date')(entry.released.split('T')[0]) : '-');
  };

  let query = function() {
    let defaults = {
      limit: "50",
      sort: "-updated,-released",
      fields: 'title,id,updated,released',
      facets: "research_type,research_station",
      score: true
    };
    let invariants = $scope.security.isAuthenticated() ? {} : {
      "not-draft": "yes",
      "not-progress": "planned",
      "filter-links.rel": "data"
    };
    return Object.assign({}, defaults, invariants);
  };

  $scope.search(query());

  $scope.$on('$locationChangeSuccess', (event, data) => {
    $scope.search(query());
  });

};

module.exports = StationBookingSearchController;
