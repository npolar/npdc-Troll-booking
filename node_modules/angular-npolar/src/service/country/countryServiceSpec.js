'use strict';

var should = require('should');
var countryService = require('./countryService')();

describe('countryService', function () {

  describe('#countryByCode', function () {
    it('should get correct country object', function () {
      countryService.countryByCode('no').name.should.eql('Norway');
    });

    it('should return undefined for miss', function () {
      should.equal(countryService.countryByCode('yolo'), undefined);
    });
  });

  describe('#countryByName', function () {
    it('should get correct country object', function () {
      countryService.countryByName('NoRwaY').code.should.eql('NO');
    });

    it('should return undefined for miss', function () {
      should.equal(countryService.countryByName('yolo'), undefined);
    });
  });

  describe('#countryByNativeName', function () {
    it('should get correct country object', function () {
      countryService.countryByNativeName('norGe').code.should.eql('NO');
    });

    it('should return undefined for miss', function () {
      should.equal(countryService.countryByNativeName('yolo'), undefined);
    });
  });

  describe('#countriesByQuery', function () {
    it('should get correct country objects', function () {
      countryService.countriesByQuery('Norway')[0].code.should.eql('NO');
    });

    it('should get correct country objects', function () {
      countryService.countriesByQuery('U.S').length.should.eql(2);
    });

    it('should get correct country objects', function () {
      countryService.countriesByQuery('').length.should.eql(250);
    });

    it('should return empry array for miss', function () {
      countryService.countriesByQuery('yolo').length.should.eql(0);
    });
  });
});
