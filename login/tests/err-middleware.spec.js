var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var errorMiddleware = require('../err-middleware');

chai.use(sinonChai);
var expect = chai.expect;

describe('Error Middleware', function () {
  const res = {
    code: null,
    status: function (code) {
      this.code = code;
      return this;
    },
    send: sinon.spy()
  };
  const err = 'Bacon is delicious!';
  
  afterEach(function () {
    res.send.reset();
  });
  it('should be a function', function () {
    expect(errorMiddleware).to.be.a('function');
  });
  it('should set the status 500', function () {
    errorMiddleware(err, {}, res);
    expect(res.status).to.be.a('function');
    expect(res.code).to.equal(401);
  });
  it('should call res.send with the correct error message', function () {
    errorMiddleware(err, {}, res);
    expect(res.send.calledOnce).to.be.true;
    expect(res.send.calledWith('Unable to log into the application: Bacon is delicious!')).to.be.true;
  });
});