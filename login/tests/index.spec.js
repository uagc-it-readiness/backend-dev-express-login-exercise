var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);
var expect = chai.expect;

var trackingService;
var userService;

describe('Routes', function () {
  var server = require('../index');
  describe('GET /', function () {
    it('should return 200 and a message', function (done) {
      chai.request(server)
        .get('/')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.text).to.equal('Welcome to my login app!');
          done();
        });
    });
  });
  
  describe('POST /', function () {
    var user = {
      id: '153b5d77-a27e-452c-8d50-6c40a1a0e2f7',
      username: 'ehemingway',
      password: 'farewelltooldmen',
      firstName: 'Ernest',
      lastName: 'Hemingway',
      created: '1899-07-21'
    };
    
    before(function () {
      trackingService = require('../../tracking/index');
      userService = require('../../users/index');
    });

    it('should return a 200 status and the user when login is successful', function (done) {
      chai.request(server)
        .post('/')
        .send({ username: 'ehemingway', password: 'farewelltooldmen' })
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.deep.equal(user);
          done();
        });
    });
  });
  it('should return a 401 when incorrect credentials are provided', function (done) {
    chai.request(server)
      .post('/')
      .send({ username: 'ehemingway', password: 'incorrectpw' })
      .end(function (err, res) {
        expect(err).to.not.be.null;
        expect(res).to.have.status(401);
        done();
      });
  });
  it('should return a 401 when too many login attempts have been made', function (done) {
    var agent = chai.request.agent(server);
    agent
      .post('/')
      .send({ username: 'ehemingway', password: 'incorrectpw' })
      .then(function () {
        return agent.post('/').send({ username: 'ehemingway', password: 'farewelltooldmen' });
      })
      .then(function () {
        return agent.post('/').send({ username: 'ehemingway', password: 'farewelltooldmen' });
      })
      .then(function () {
        return agent.post('/').send({ username: 'ehemingway', password: 'farewelltooldmen' });
      })
      .then(function () {
        return agent.post('/').send({ username: 'ehemingway', password: 'farewelltooldmen' });
      })
      .then(function (res) {
        return agent.post('/').send({ username: 'ehemingway', password: 'farewelltooldmen' });
      })
      .catch(function (err) {
        expect(err).to.not.be.null;
        expect(err).to.have.status(401);
        done();
      });
  });
});