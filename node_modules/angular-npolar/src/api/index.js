'use strict';
var angular = require('angular');

var ngNpolar = angular.module('ngNpolar');
ngNpolar.value('npolarApiConfig', require('./config'));
ngNpolar.service('NpolarApiUser', require('./session/User'));
ngNpolar.service('NpolarApiSecurity', require('./http/Security'));
ngNpolar.service('NpolarApiResource', require('./http/Resource'));
ngNpolar.factory('npolarApiInterceptor', require('./http/HttpInterceptor'));

ngNpolar.service('NpolarApiText', require('./util/Text'));
ngNpolar.service('npolarDocumentUtil', require('./util/document'));
ngNpolar.directive('npolarJsonText', require('./util/jsonText'));

ngNpolar.controller('NpolarBaseController', require('./controller/BaseController'));
ngNpolar.controller('NpolarEditController', require('./controller/EditController'));

ngNpolar.service('Gouncer', require('./gouncer/GouncerService'));
