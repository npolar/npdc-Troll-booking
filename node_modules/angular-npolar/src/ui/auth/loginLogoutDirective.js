'use strict';

var loginLogout = function (NpolarApiSecurity, npolarApiConfig, $http) {
  'ngInject';

  return {
   scope: {},
   controller: 'NpolarLoginController',
   templateUrl: 'angular-npolar/src/ui/auth/_user.html',
   link: function(scope) {

      scope.user = NpolarApiSecurity.getUser();

   }
  };
};

module.exports = loginLogout;
