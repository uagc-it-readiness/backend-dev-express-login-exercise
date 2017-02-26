var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);
var expect = chai.expect;

describe('Routes', function () {
  var server = require('../index');
  
  describe('GET /tracking', function () {
    it('should return an error when no query parameters are provided', function (done) {
      chai.request(server)
        .get('/tracking')
        .end(function (err, res) {
            expect(err).to.not.be.null;
            expect(res).to.have.status(500);
            expect(res.text).to.equal('Internal server error: Incorrect query params provided: {}');
          done();
        });
    });
    it('should respond with a 200 if the attempt limit has not been exceeded', function (done) {
      chai.request(server)
        .get('/tracking?username=bob&currentDate=2017-02-06')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should respond with a 403 when the request limit has been exceeded', function (done) {
      var agent = chai.request.agent(server);
      agent
        .get('/tracking?username=bob&currentDate=2017-02-06')
        .then(function () {
          return agent.get('/tracking?username=bob&currentDate=2017-02-06')
        })
        .then(function () {
          return agent.get('/tracking?username=bob&currentDate=2017-02-06')
        })
        .then(function () {
          return agent.get('/tracking?username=bob&currentDate=2017-02-06')
        })
        .then(function () {
          return agent.get('/tracking?username=bob&currentDate=2017-02-06')
        })
        .then(function (res) {
          return agent.get('/tracking?username=bob&currentDate=2017-02-06')
        })
        .catch(function (err) {
          expect(err).to.not.be.null;
          expect(err).to.have.status(403);
          done();
        });
    });
  });
});