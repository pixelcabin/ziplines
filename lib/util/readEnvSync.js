var fs = require('fs');

module.exports = function(errCallback) {
  try {
    var gruntfile = fs.readFileSync('Gruntfile.js', 'utf8');

    gruntfile = gruntfile.split('environment: \'');
    gruntfile = gruntfile[1].split('\'');
    return gruntfile[0];
  } catch (err) {
    if (errCallback) {
      return errCallback(err);
    } else { return console.log(err); }
  }
};