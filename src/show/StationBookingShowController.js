'use strict';

var StationBookingShowController = function($controller, $routeParams,
  $scope, $q, StationBooking, npdcAppConfig) {
    'ngInject';


  $controller('NpolarBaseController', {
    $scope: $scope
  });
  $scope.resource = StationBooking;



  let uri = (station_booking) => {
    let link = station_booking.links.find(l => {
      return l.rel === "alternate" && (/html$/).test(l.type);
    });
    if (link) {
      return link.href.replace(/^http:/, "https:");
    } else {
      return `https://data.npolar.no/station_booking/${ station_booking.id }`;
    }
  };


  let show = function() {
    $scope.show().$promise.then((station_booking) => {
      npdcAppConfig.cardTitle = $scope.document.title;
      $scope.links = station_booking.links.filter(l => (l.rel !== "alternate" && l.rel !== "edit") && l.rel !== "data");
      $scope.data = station_booking.links.filter(l => l.rel === "data");
      $scope.alternate = station_booking.links.filter(l => ((l.rel === "alternate" && l.type !== "text/html") || l.rel === "edit"));



      $scope.uri = uri(station_booking);

  /*    let relatedDatasets = Dataset.array({
        q: dataset.title,
        fields: 'id,title,collection',
        score: true,
        limit: 5,
        'not-id': dataset.id,
        op: 'OR'
      }).$promise;
      let relatedPublications = Publication.array({
        q: dataset.title,
        fields: 'id,title,published_sort,collection',
        score: true,
        limit: 5,
        op: 'OR'
      }).$promise;
      let relatedProjects = Project.array({
        q: dataset.title,
        fields: 'id,title,collection',
        score: true,
        limit: 5,
        op: 'OR'
      }).$promise;

      $q.all([relatedDatasets, relatedPublications, relatedProjects]).then(related => {
        $scope.related = related;
      });  */

    });

  };


  show();
};

module.exports = StationBookingShowController;
