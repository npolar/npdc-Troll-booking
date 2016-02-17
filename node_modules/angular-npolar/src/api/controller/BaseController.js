'use strict';
/**
* NpolarBaseController is meant to be the parent of a safe controller,
* ie. a controller dealing with only with presentation, search, etc.
* See also NpolarEditController.
*
*/

var BaseController = function($scope, $location, $routeParams, $http, NpolarApiSecurity) {
  'ngInject';

  $scope._error = false;
  $scope.security = NpolarApiSecurity;

  $scope.error = () => $scope._error;

  // Show action, ie. fetch document and inject into scope
  $scope.show = function() {
    return $scope.resource.fetch($routeParams, function(document) {
      $scope.document = document;
      $scope._error = false;
    }, function(errorData) {
      if (errorData.status === 404) {
        $scope._error = "Couldn't find document \"" + $routeParams.id + "\"";
      } else {
        $scope._error = "Couldn't load document :(";
        if (errorData.statusText && errorData.statusText.length > 0) {
          $scope._error += ". Status: " + errorData.status + ", Message: " + errorData.statusText;
        }
      }
    });
  };

  // Search action, ie. fetch feed and inject into scope
  $scope.search = function(query, invariants) {
    let facets = (query.facets ? query.facets + "," : "") + ($location.search().facets || '');

    let fullQuery = Object.assign({}, query, $location.search(), {facets});

    return $scope.resource.feed(fullQuery, function(response) {
      $scope.feed = response.feed;
      $scope._error = false;
    }, function(errorData) {
      $scope._error = "Couldn't load search results :(";
      if (errorData.statusText && errorData.statusText.length > 0) {
        $scope._error += ". Status: " + errorData.status + ", Message: " + errorData.statusText;
      }
    });
  };

};

module.exports = BaseController;
