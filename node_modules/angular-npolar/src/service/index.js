'use strict';
var angular = require('angular');

var ngNpolar = angular.module('ngNpolar');

ngNpolar.service('npolarCountryService', require('./country/countryService'));
