/**
 * Angular service to communicate with [Gouncer](https://github.com/npolar/gouncer)
 */
'use strict';

let Gouncer = function($log, $http, NpolarApiSecurity) {
  'ngInject';

  const base = NpolarApiSecurity.canonicalUri('/user');

  let forceNpolarEmailIfAtDomainIsMissing = function(email) {
    if (false === (/[@]/).test(email)) {
      email = email + '@npolar.no';
    }
    return email;
  };

  // Authenticate
  this.authenticate = function(email,password) {

    // Use HTTP Basic if email and password is passed
    if (email !== undefined && password !== undefined) {

      email = forceNpolarEmailIfAtDomainIsMissing(email);

      let request = { method: "GET", url: `${base}/authenticate`,
        headers: { "Authorization": "Basic " + NpolarApiSecurity.basicToken(email, password) }
      };
      return $http(request);

    } else if (NpolarApiSecurity.isJwtValid()) {
      return $http.get(`${base}/authenticate`);
    } else {
      throw new Error("Cannot authenticate: either JWT is invalid or username/password is blank");
    }
  };

  // One time password
  this.onetime = function(email, link=`https://${window.location.host}/user/login/1-time?username={{user}}&code={{code}}`) {
    email = forceNpolarEmailIfAtDomainIsMissing(email);
    let param = { email };
    if (/^https/.test(link)) {
      param.link = link;
    }
    return $http.post(`${base}/onetime`, param);
  };

  return this;
};

module.exports = Gouncer;
