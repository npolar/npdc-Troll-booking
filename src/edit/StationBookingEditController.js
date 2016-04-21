'use strict';

var StationBookingEditController = function($scope, $controller, $routeParams, StationBooking, formula,
  formulaAutoCompleteService, npdcAppConfig, chronopicService, fileFunnelService, NpolarLang) {
  'ngInject';

  // EditController -> NpolarEditController
  $controller('NpolarEditController', {
    $scope: $scope
  });

  // StationBooking -> npolarApiResource -> ngResource
  $scope.resource = StationBooking;

  let formulaOptions = {
    schema: '//api.npolar.no/schema/station-booking',
    form: 'edit/formula.json',
    language: NpolarLang.getLang(),
    templates: npdcAppConfig.formula.templates.concat([{
      match(field) {
        return ["alternate", "edit", "via"].includes(field.value.rel);
      },
      hidden: true
    }, {
      match: "people_item",
      template: '<npdc:formula-person></npdc:formula-person>'
    }
  ]),
    languages: npdcAppConfig.formula.languages.concat([{
      map: require('./en.json'),
      code: 'en'
    },
    {
      map: require('./no.json'),
      code: 'nb_NO',
    }])
  };

  $scope.formula = formula.getInstance(formulaOptions);


  let autocompleteFacets = ["people.first_name", "people.last_name", "people.country"];
  formulaAutoCompleteService.autocompleteFacets(autocompleteFacets, $scope.resource, $scope.formula);



  chronopicService.defineOptions({ match: 'released', format: '{date}'});
  chronopicService.defineOptions({ match(field) {
    return field.path.match(/^#\/activity\/\d+\/.+/);
  }, format: '{date}'});

  let doc = $scope.edit();
  console.log('doc', doc);
};

module.exports = StationBookingEditController;
