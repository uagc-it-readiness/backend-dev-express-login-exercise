var express = require('express');

var errMiddleware = require('./err-middleware');

var app = express();

var trackingCache = {};

app.get('/tracking', function (req, res, next) {
  if (!req.query.username || !req.query.currentDate) {
    next('Incorrect query params provided: ' + JSON.stringify(req.query));
  }
  
  var user = req.query.username;
  var date = req.query.currentDate;
  
  if (!trackingCache[user]) {
    trackingCache[user] = {};
    trackingCache[user][date] = 0;
  }
  
  trackingCache[user][date] += 1;

  if (trackingCache[user][date] > 5) {
    res.status(403).end();
  } else {
    res.status(200).end();
  }
});

app.use(errMiddleware);

app.listen(3002);