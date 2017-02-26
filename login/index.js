var express = require('express');
var bodyParser = require('body-parser');

var errMiddleware = require('./err-middleware');
var helpers = require('./helpers');

var app = express();

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.status(200).send('Welcome to my login app!');
});

app.post('/', function (req, res, next) {
  var user;
  helpers.sendRequest('http://localhost:3001')
    .then(function (result) {
      user = helpers.findUser(JSON.parse(result.body), req.body.username)[0];
      
      if (user.password !== req.body.password) {
        throw new Error('Incorrect credentials');
      }
      
      return helpers.sendRequest('http://localhost:3002');  
    })
    .then(function (result) {
      if (result.status === 403) {
        throw new Error('Too many login attempts');
      }
      
      res.status(200).json(user);
    })
    .catch(next);
});

app.use(errMiddleware);
app.listen(3003);

module.exports = app;