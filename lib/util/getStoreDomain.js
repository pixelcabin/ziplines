var fs = require('fs');

module.exports = function(callback, errCallback) {
  fs.readFile('Gruntfile.js', 'utf8', function (err, data) {
    if (err) {
      if (errCallback) {
        return errCallback(err);
      } else { return console.log(err); }
    }

    var result = data.toString('utf8');
    result = result.split('credentials: grunt.file.readJSON(\'credentials.json\'),');
    result = result[1].split(',');
    result = result[0].split(':');
    result = result[1].replace(/'| /g, '');
    callback(result);
  });
};