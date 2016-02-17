/**
 * npolarApiConfig, meant to be .run and merged with overrides for the current environment
 *
 */
'use strict';

var config = {
  environment: 'production',
  lang: 'en',
  base: '//api.npolar.no',
  security: {
    authorization: 'jwt'
  }
};

module.exports = config;
