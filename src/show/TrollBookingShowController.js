'use strict';

var TrollBookingShowController = function($controller, $routeParams,
  $scope, $q, TrollBooking, npdcAppConfig) {
    'ngInject';


  $controller('NpolarBaseController', {
    $scope: $scope
  });
  $scope.resource = TrollBooking;



  let uri = (troll_booking) => {
    let link = troll_booking.links.find(l => {
      return l.rel === "alternate" && (/html$/).test(l.type);
    });
    if (link) {
      return link.href.replace(/^http:/, "https:");
    } else {
      return `https://data.npolar.no/troll_booking/${ troll_booking.id }`;
    }
  };


  let show = function() {
    $scope.show().$promise.then((troll_booking) => {
      npdcAppConfig.cardTitle = $scope.document.title;
      $scope.links = troll_booking.links.filter(l => (l.rel !== "alternate" && l.rel !== "edit") && l.rel !== "data");
      $scope.data = troll_booking.links.filter(l => l.rel === "data");
      $scope.alternate = troll_booking.links.filter(l => ((l.rel === "alternate" && l.type !== "text/html") || l.rel === "edit"));



      $scope.uri = uri(troll_booking);

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

module.exports = TrollBookingShowController;
