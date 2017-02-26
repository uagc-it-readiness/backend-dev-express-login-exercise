var request = require('request');

module.exports = {
  sendRequest: sendRequest,
  findUser: findUser
};

function sendRequest (url) {
  return new Promise(function (resolve, reject) {
    request(url, function (err, res, body) {
      if (err || !res) {
        reject('There was an issue sending a request to ' + url);
      }
      
      resolve({
        res: res,
        body: body || {}
      });
    });
  });
}

function findUser (userArray, reqUser) {
  return userArray.filter(function (userObj) {
    return userObj.username === reqUser;
  });
}