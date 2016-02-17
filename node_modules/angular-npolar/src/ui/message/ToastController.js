'use strict';

let ToastController = function ($scope, $mdToast, explanation, msgType) {
  'ngInject';

  $scope.explanation = explanation;
  $scope.msgType = msgType;

  $scope.closeToast = function () {
    $mdToast.hide();
  };
};

module.exports = ToastController;
