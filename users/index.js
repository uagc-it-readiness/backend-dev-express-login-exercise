var express = require('express');
var uuid = require('uuid');
var bodyParser = require('body-parser');
var moment = require('moment');

var users = require('./users');
var errMiddleware = require('./err-middleware');
var helpers = require('./helpers');

var app = express();

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.status(200).json(users);
});

app.post('/', function (req, res, next) {
  if (helpers.validateUser(req.body)) {
    var userCopy = Object.assign({}, req.body);
    userCopy.id = uuid.v4();
    userCopy.created = moment(Date.now()).format('YYYY-MM-DD');
    users.push(userCopy);
    res.status(200).json(userCopy);
  } else {
    next('Invalid user provided');
  }
});

app.get('/user/:id', function (req, res) {
  const user = users.filter(function (userObject) {
    return req.params.id === userObject.id;
  });
  
  res.status(200).send(user[0]);
});

app.use(errMiddleware);
app.listen(3001);

module.exports = app;