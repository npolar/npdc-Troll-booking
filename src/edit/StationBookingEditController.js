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
    }, {
      match: "sciencekeywords_item",
      template: '<npdc:formula-gcmd-keyword></npdc:formula-gcmd-keyword>'
    }, {
      match: "coverage_item",
      template: "<dataset:coverage></dataset:coverage>"
    }, {
      match: "placenames_item",
      template: '<npdc:formula-placename></npdc:formula-placename>'
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
  formulaAutoCompleteService.autocompleteFacets(['organisations.name', 'organisations.email',
    'organisations.homepage', 'organisations.gcmd_short_name', 'links.type', 'sets', 'tags'], StationBooking, $scope.formula);

  chronopicService.defineOptions({ match: 'released', format: '{date}'});
  chronopicService.defineOptions({ match(field) {
    return field.path.match(/^#\/activity\/\d+\/.+/);
  }, format: '{date}'});

  let doc = $scope.edit();
  console.log('doc', doc);
};

module.exports = StationBookingEditController;
