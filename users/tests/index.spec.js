var chai = require('chai');
var chaiHttp = require('chai-http');
var users = require('../users');

chai.use(chaiHttp);
var expect = chai.expect;

describe('Routes', function () {
  var server = require('../index');
  
  describe('GET /', function () {
    it('should return a 200 message with the users array', function (done) {
      chai.request(server)
        .get('/')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.deep.equal(users);
          done();
        });
    });
  });
  
  describe('POST / ', function () {
    it('should return a 200 and valid user object', function (done) {
      var user = {
        username: 'beggs',
        firstName: 'Bacon',
        lastName: 'Eggs'
      };
      chai.request(server)
        .post('/')
        .send(user)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.hasOwnProperty('id')).to.be.true;
          expect(res.body.hasOwnProperty('created')).to.be.true;
          done();
        });
    });
    it('should return a 500 with the appropriate error message if an invalid user is sent', function (done) {
      var user = {
        invalid: 42
      };
      chai.request(server)
        .post('/')
        .send(user)
        .end(function (err, res) {
          expect(err).to.not.be.null;
          expect(res).to.have.status(500);
          expect(res.text).to.equal('Internal server error: Invalid user provided');
          done();
        });
    });
  });
  
  describe('GET /user/:id', function (req, res) {    
    it('should return a 200 status with a user object containing a matching id', function (done) {
      var user = {
        id: '6ab3bc82-bd43-404d-904b-735e9a5bd2c0',
        username: 'aeinstein',
        password: 'emc2',
        firstName: 'Albert',
        lastName: 'Einstein',
        created: '1879-03-14'
      };
      
      chai.request(server)
        .get('/user/6ab3bc82-bd43-404d-904b-735e9a5bd2c0')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.be.json;
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal(user);
          done();
        });
    });
  });
});