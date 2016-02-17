'use strict';

var TrollBookingEditController = function($scope, $controller, $routeParams, TrollBooking, formula,
  formulaAutoCompleteService, npdcAppConfig, chronopicService) {
  'ngInject';

  // EditController -> NpolarEditController
  $controller('NpolarEditController', {
    $scope: $scope
  });

  // TrollBooking -> npolarApiResource -> ngResource
  $scope.resource = TrollBooking;

  let formulaOptions = {
    schema: '//api.npolar.no/schema/troll-booking',
    form: 'edit/formula.json',
    templates: npdcAppConfig.formula.templates.concat([{
      match(field) {
        return ["alternate", "edit", "via"].includes(field.value.rel);
      },
      hidden: true
    } /*,
    {
      match: "people_item",
      template: '<npdc:formula-person></npdc:formula-person>'
    }, {
      match: "gcmd",
      template: '<npdc:formula-gcmd></npdc:formula-gcmd>'
    }, {
      match: "sciencekeywords_item",
      template: '<npdc:formula-gcmd-keyword></npdc:formula-gcmd-keyword>'
    }, {
      match: "coverage_item",
      template: "<dataset:coverage></dataset:coverage>"
    }, {
      match: "placenames_item",
      template: '<npdc:formula-placename></npdc:formula-placename>'
    } */ ]),
    languages: npdcAppConfig.formula.languages
  };

  $scope.formula = formula.getInstance(formulaOptions);
  formulaAutoCompleteService.autocompleteFacets(['organisations.name', 'organisations.email',
    'organisations.homepage', 'organisations.gcmd_short_name', 'links.type', 'sets', 'tags'], TrollBooking, $scope.formula);

  chronopicService.defineOptions({ match: 'released', format: '{date}'});
  chronopicService.defineOptions({ match(field) {
    return field.path.match(/^#\/activity\/\d+\/.+/);
  }, format: '{date}'});


  $scope.edit();
};

module.exports = TrollBookingEditController;
