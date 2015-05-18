var fs = require('fs');

module.exports = function(callback) {
  fs.readFile('credentials.json', 'utf8', function (err, data) {
    if (err) { callback(null, err); }
    var jsonResult = JSON.parse(data.toString('utf8'));
    callback(jsonResult, null);
  });
};