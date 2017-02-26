var chai = require('chai');
var helpers = require('../helpers');

var expect = chai.expect;

describe('Helper Functions', function () {
  it('should be an object', function () {
    expect(helpers).to.be.an('object');
    expect(helpers).to.have.all.keys([
      'validateUser',
      'validateProp',
      'isTrue'
    ]);
  });
  
  describe('validateUser()', function () {
    it('should be a function', function () {
      expect(helpers.validateUser).to.be.a('function');
    });
    it('should return true when a valid user object is provided', function () {
      var user = {
        username: 'beggs',
        firstName: 'Bacon',
        lastName: 'Eggs'
      };
      
      var result = helpers.validateUser(user);
      expect(result).to.equal(true);
    });
    it('should return false if the user object contains an id', function () {
      var user = {
        id: 'something-really-long-but-not-valid'
      };
      
      var result = helpers.validateUser(user);
      expect(result).to.equal(false);
    });
    it('should return false if an invalid user is provided', function () {
      var user = {
        username: ''
      };
      
      var result = helpers.validateUser(user);
      expect(result).to.equal(false);
    });
  });
  
  describe('validateProp', function () {
    it('should be a function', function () {
      expect(helpers.validateProp).to.be.a('function');
    });
    it('should return true when a valid property and user are passed', function () {
      var user = {
        firstName: 'Bacon'
      };
      
      var result = helpers.validateProp(user, 'firstName');
      expect(result).to.equal(true);
    });
    it('should return false when the property name does not exist in the user object', function () {
      var user = {
        falseProp: 'jam'
      };
      
      var result = helpers.validateProp(user, 'firstName');
      expect(result).to.equal(false);
    });
    it('should return false when the user object value is not a string', function () {
      var user = {
        falseProp: 42
      };
      
      var result = helpers.validateProp(user, 'falseProp');
      expect(result).to.equal(false);
    });
    it('should return false when the user object value is an empty string', function () {
      var user = {
        falseProp: ''
      };
      
      var result = helpers.validateProp(user, 'falseProp');
      expect(result).to.equal(false);
    });
  });
  
  describe('isTrue', function () {
    it('should be a function', function () {
      expect(helpers.isTrue).to.be.a('function');
    });
    it('should return true if the validation result is true', function () {
      expect(helpers.isTrue(true)).to.equal(true);
    });
    it('should return false if the validation result is false', function () {
      expect(helpers.isTrue(false)).to.equal(false);
    });
  });
});