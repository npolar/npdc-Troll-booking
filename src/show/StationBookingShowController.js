'use strict';

var StationBookingShowController = function($controller, $routeParams,
  $scope, $q, StationBooking, npdcAppConfig, Dataset, Project, Publication) {
    'ngInject';


  $controller('NpolarBaseController', {
    $scope: $scope
  });
  $scope.resource = StationBooking;



  let authors = (stationBooking) => {

    var folks = [];
    var orgs = [];

    if (stationBooking.people instanceof Array) {
      folks = stationBooking.people.filter(p => p.roles.includes("author"));
    }

    if (folks.length === 0 && stationBooking.organisations instanceof Array) {
      orgs = stationBooking.organisations.filter(o => o.roles.includes("author"));
    }
    return folks.concat(orgs);

  };


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
      $scope.document.research_type =  convert($scope.document.research_type);
      $scope.links = stationBooking.links.filter(l => (l.rel !== "alternate" && l.rel !== "edit") && l.rel !== "data");
      $scope.data = stationBooking.links.filter(l => l.rel === "data");
      $scope.alternate = stationBooking.links.filter(l => ((l.rel === "alternate" && l.type !== "text/html") || l.rel === "edit")).concat({
        href: `http://api.npolar.no/station-booking/?q=&filter-id=${stationBooking.id}&format=json&variant=ld`,
        title: "DCAT (JSON-LD)",
        type: "application/ld+json"
      });

      $scope.authors = authors(stationBooking).map(a => {
        if (!a.name && a.first_name) {
          a.name = `${a.first_name} ${a.last_name}`;
        }
        return a;
      });


      $scope.uri = uri(stationBooking);

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

/* convert from camelCase to lower case text*/
function convert(str) {
       var  positions = '';

       for(var i=0; i<(str).length; i++){
           if(str[i].match(/[A-Z]/) !== null){
             positions += " ";
             positions += str[i].toLowerCase();
        } else {
            positions += str[i];
        }
      }
        return positions;
}

module.exports = StationBookingShowController;
