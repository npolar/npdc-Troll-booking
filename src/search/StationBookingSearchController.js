'use strict';


var StationBookingSearchController = function ($scope, $location, $controller, $filter, StationBooking, npdcAppConfig,  NpdcSearchService, NpolarTranslate) {
  'ngInject';

  $controller('NpolarBaseController', { $scope: $scope });
  $scope.resource = StationBooking;



 npdcAppConfig.search.local.results.detail = (entry) => {
     let updatedText = NpolarTranslate.translate('updated');
     let r = (entry.research_station).charAt(0).toUpperCase() +  (entry.research_station).slice(1) + ", "+ updatedText +":";
     return r+` ${(entry.updated.split('T')[0])}`;
 };


  npdcAppConfig.cardTitle = "Station booking Archive";
  npdcAppConfig.search.local.results.subtitle = "type";


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

