require('../index');
var chai = require('chai');
var helpers = require('../helpers');

var expect = chai.expect;

describe('Helper Functions', function () {
  it('should be an object', function () {
    expect(helpers).to.be.an('object');
    expect(helpers).to.have.all.keys([
      'sendRequest',
      'findUser'
    ]);
  });
  
  describe('sendRequest', function () {
    it('should be a function', function () {
      expect(helpers.sendRequest).to.be.a('function');
    });
    it('should return a promise', function () {
      var result = helpers.sendRequest('http://localhost:3003');
      expect(result.then).to.be.a('function');
    });
    it('should return an object with a res and body property', function (done) {
      helpers.sendRequest('http://localhost:3003')
        .then(function (response) {
          expect(response).to.be.an('object');
          expect(response).to.have.all.keys([
            'res',
            'body'
          ]);
          done();
        })
        .catch(function (err) {
          done(err);
        });
    });
    it('should return an error if there is not response or an invalid url is used', function (done) {
      helpers.sendRequest('http://localhost:3001/notaurl')
        .catch(function (err) {
          expect(err).to.not.be.null;
          expect(err).to.equal('There was an issue sending a request to http://localhost:3001/notaurl');
          done();
        });
    });
  });
  
  describe('findUser', function () {
    it('should be a function', function () {
      expect(helpers.findUser).to.be.a('function');
    });
    it('should return the matching user from an array', function () {
      var users = [
        { username: 'bob' },
        { username: 'kyle' },
        { username: 'cindy' }
      ];
      
      var result = helpers.findUser(users, 'kyle');
      expect(result[0]).to.deep.equal(users[1]);
    })
  });
});