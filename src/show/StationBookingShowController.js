'use strict';

var StationBookingShowController = function($controller, $routeParams,
  $scope, $q, StationBooking, npdcAppConfig) {
    'ngInject';


  $controller('NpolarBaseController', {
    $scope: $scope
  });
  $scope.resource = StationBooking;

 /* let authors = (StationBooking) => {

    var folks = [];
    var orgs = [];

    if (StationBooking.people instanceof Array) {
      folks = station-booking.people.filter(p => p.roles.includes("author"));
    }

    if (folks.length === 0 && dataset.organisations instanceof Array) {
      orgs = dataset.organisations.filter(o => o.roles.includes("author"));
    }
    return folks.concat(orgs);

  }; */
  console.log("xxxxxxx");
  console.log(document);

  let author_names = (dataset) => {
    var et_al_suffix = "";
    var all_authors = authors(dataset);
    if (all_authors.length > 5) {
      all_authors = [all_authors[0]];
      et_al_suffix = " et al";
    }
    var names = all_authors.map(a => {
      return a.hasOwnProperty("name") ? a.name : `${a.first_name[0]} ${a.last_name}`;
    });
    return names.join(", ") + et_al_suffix;
  };

  let published_year = (dataset) => {
    let y = "not-yet released";
    if ((/^\d{4}\-/).test(dataset.released)) {
      y = new Date(dataset.released).getFullYear();
    }
    return y;
  };



  let uri = (dataset) => {
    let link = dataset.links.find(l => {
      return l.rel === "alternate" && (/html$/).test(l.type);
    });
    if (link) {
      return link.href.replace(/^http:/, "https:");
    } else {
      return `https://data.npolar.no/dataset/${ dataset.id }`;
    }
  };


  let show = function() {
    $scope.show().$promise.then((dataset) => {
      $scope.citation = citation(dataset);

      $scope.published_year = published_year(dataset);
      $scope.links = dataset.links.filter(l => (l.rel !== "alternate" && l.rel !== "edit") && l.rel !== "data");
      $scope.data = dataset.links.filter(l => l.rel === "data");
      $scope.alternate = dataset.links.filter(l => ((l.rel === "alternate" && l.type !== "text/html") || l.rel === "edit")).concat({
        href: `http://api.npolar.no/dataset/?q=&filter-id=${dataset.id}&format=json&variant=ld`,
        title: "DCAT (JSON-LD)",
        type: "application/ld+json"
      });


      $scope.mapOptions = {};

      if (dataset.coverage) {
        let bounds = dataset.coverage.map(cov => [[cov.south, cov.west], [cov.north, cov.east]]);
        $scope.mapOptions.coverage = bounds;
      }

      $scope.authors = authors(dataset).map(a => {
        if (!a.name && a.first_name) {
          a.name = `${a.first_name} ${a.last_name}`;
        }
        return a;
      });

      if (dataset.coverage) {
        $scope.coverage = (JSON.stringify(dataset.coverage)).replace(/[{"\[\]}]/g, '');
      }

      $scope.uri = uri(dataset);

      let relatedDatasets = Dataset.array({
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
      });

    });

  };


  show();
};

module.exports = StationBookingShowController;
