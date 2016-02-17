// FIXME This service is misnamed and will probably die (it's just a thin session storage wrapper)
'use strict';

var User = function(base64, npolarApiConfig) {
  'ngInject';

  let storage = localStorage;

  this.getUser = function() {
    let user = {
      name: null,
      email: null,
      systems: []
    };
    try {
      let storedUser = storage.getItem(this.getStorageKey());
      return JSON.parse(base64.decode(storedUser));
    } catch (e) {
      // noop
    }
    return user;
  };

  this.setUser = function(user) {
    var key = this.getStorageKey(user);
    storage.setItem(key, base64.encode(JSON.stringify(user)));
  };

  this.removeUser = function() {
    storage.removeItem(this.getStorageKey());
  };

  this.getStorageKey = function() {
    return 'NpolarApiUser-' + npolarApiConfig.base.split("//")[1];
  };

};

module.exports = User;
