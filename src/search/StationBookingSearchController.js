'use strict';


var StationBookingSearchController = function ($scope, $location, $controller, $filter, StationBooking, npdcAppConfig, NpolarTranslate) {
  'ngInject';

  $controller('NpolarBaseController', { $scope: $scope });
  $scope.resource = StationBooking;



 npdcAppConfig.search.local.results.detail = (e) => {
     var str =  (e.research_station);
    return str.charAt(0).toUpperCase() +  str.slice(1) + ", last updated: " + e.updated.split('T')[0];
 };


  npdcAppConfig.cardTitle = "Station booking Archive";
  npdcAppConfig.search.local.results.subtitle = "type";
 /* npdcAppConfig.search.local.filterUi = {
    'year-activity.departed': {
      type: 'range'
    },
    'updated': {
      type: 'hidden'
    }
  };*/

  let query = function() {
    let defaults = {
      limit: "50",
      sort: "-updated",
      fields: 'title,id,collection,updated,research_station',
      facets: 'research_station,research_type'};

    let invariants = $scope.security.isAuthenticated() ? {} : {} ;
    return Object.assign({}, defaults, invariants);
  };

  $scope.search(query());

  $scope.$on('$locationChangeSuccess', (event, data) => {
    $scope.search(query());
  });

};

module.exports = StationBookingSearchController;

