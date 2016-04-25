'use strict';

var StationBookingShowController = function($controller, $routeParams,
  $scope, $q, StationBooking, npdcAppConfig, Dataset, Project, Publication) {
    'ngInject';


  $controller('NpolarBaseController', {
    $scope: $scope
  });
  $scope.resource = StationBooking;


  let uri = (stationBooking) => {
    let link = stationBooking.links.find(l => {
      return l.rel === "alternate" && (/html$/).test(l.type);
    });
    if (link) {
      return link.href.replace(/^http:/, "https:");
    } else {
      return `https://data.npolar.no/station-booking/${ stationBooking.id }`;
    }
  };


  let show = function() {
    $scope.show().$promise.then((stationBooking) => {

      $scope.links = stationBooking.links.filter(l => (l.rel !== "alternate" && l.rel !== "edit") && l.rel !== "data");
      $scope.data = stationBooking.links.filter(l => l.rel === "data");
      $scope.alternate = stationBooking.links.filter(l => ((l.rel === "alternate" && l.type !== "text/html") || l.rel === "edit")).concat({
        href: `http://api.npolar.no/station-booking/?q=&filter-id=${stationBooking.id}&format=json&variant=ld`,
        title: "DCAT (JSON-LD)",
        type: "application/ld+json"
      });


      let relatedDatasets = Dataset.array({
        q: stationBooking.title,
        fields: 'id,title,collection',
        score: true,
        limit: 5,
        'not-id': stationBooking.id,
        op: 'OR'
      }).$promise;
      let relatedPublications = Publication.array({
        q: stationBooking.title,
        fields: 'id,title,published_sort,collection',
        score: true,
        limit: 5,
        op: 'OR'
      }).$promise;
      let relatedProjects = Project.array({
        q: stationBooking.title,
        fields: 'id,title,collection',
        score: true,
        limit: 5,
        op: 'OR'
      }).$promise;

      $q.all([relatedDatasets, relatedPublications, relatedProjects]).then(related => {
        $scope.related = related;
      });

    });

  };


  show();
};

module.exports = StationBookingShowController;
