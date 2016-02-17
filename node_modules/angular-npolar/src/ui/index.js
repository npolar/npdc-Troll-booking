'use strict';
var angular = require('angular');

var ngNpolar = angular.module('ngNpolar');

ngNpolar.controller('NpolarLoginController', require('./auth/LoginController'));
ngNpolar.directive('npolarLoginLogout', require('./auth/loginLogoutDirective'));

ngNpolar.controller('NpolarMessageController', require('./message/MessageController'));
ngNpolar.controller('NpolarToastController', require('./message/ToastController'));
ngNpolar.directive('npolarMessage', require('./message/messageDirective'));

ngNpolar.filter('isodate', require('./filters/isodate'));
ngNpolar.filter('year', require('./filters/year'));
ngNpolar.filter('lang', require('./filters/lang'));

// i18n
ngNpolar.service('NpolarLang', require('./i18n/LangService'));
ngNpolar.service('NpolarTranslate', require('./i18n/TranslateService'));
ngNpolar.value('npolarTranslateKeys', require('./i18n/translateKeys'));
ngNpolar.filter('t', require('./i18n/translateFilter'));
ngNpolar.filter('title', require('./i18n/titleFilter'));
ngNpolar.directive('npolarLanguageSwitcher', require('./i18n/langMenuDirective'));
