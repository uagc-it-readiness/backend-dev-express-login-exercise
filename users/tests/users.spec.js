var chai = require('chai');
var users = require('../users');

var expect = chai.expect;

describe('User Module', function () {
  it('should be an array', function () {
    expect(users).to.be.an('array');
  });
  it('should have 5 users in it', function () {
    expect(users.length >= 5).to.be.true;
    expect(users[0]).to.be.an('object');
    expect(users[1]).to.be.an('object');
    expect(users[2]).to.be.an('object');
    expect(users[3]).to.be.an('object');
    expect(users[4]).to.be.an('object');
  });
});