'use strict';

var StationBookingEditController = function($scope, $controller, $routeParams, StationBooking, formula,
  formulaAutoCompleteService, npdcAppConfig, chronopicService, fileFunnelService, NpolarLang, npolarApiConfig,
  NpolarApiSecurity, npolarCountryService, NpolarMessage) {
  'ngInject';

  // EditController -> NpolarEditController
  $controller('NpolarEditController', {
    $scope: $scope
  });

  // StationBooking -> npolarApiResource -> ngResource
  $scope.resource = StationBooking;

  let templates = [];

  let i18n = [{
      map: require('./en.json'),
      code: 'en'
    },
    {
      map: require('./no.json'),
      code: 'nb_NO',
    }];

  $scope.formula = formula.getInstance({
    schema: '//api.npolar.no/schema/station-booking',
    form: 'edit/formula.json',
    language: NpolarLang.getLang(),
    templates: npdcAppConfig.formula.templates.concat(templates),
    languages: npdcAppConfig.formula.languages.concat(i18n)
   });

  formulaAutoCompleteService.autocomplete({
    match: "@country",
    querySource: 'https://api.npolar.no/country',
    label: 'name',
    value: 'code'
  }, $scope.formula);

  let autocompleteFacets = ["people.first_name", "people.last_name", "people.organisation", "groups.organisation"];
  formulaAutoCompleteService.autocompleteFacets(autocompleteFacets, StationBooking, $scope.formula);


 // chronopicService.defineOptions({ match: 'released', format: '{date}'});
 // chronopicService.defineOptions({ match(field) {
 //   return field.path.match(/^#\/activity\/\d+\/.+/);
 // }, format: '{date}'});

//Set chronopic view format (this does not change the internal value, i.e. ISO string date)
 chronopicService.defineOptions({ match(field) {
    return field.path.match(/_date$/);
 }, format: '{date}'});


   $scope.edit();
};

module.exports = StationBookingEditController;
