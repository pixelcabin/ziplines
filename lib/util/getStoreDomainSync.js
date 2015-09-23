var fs = require('fs');

module.exports = function(errCallback) {
  try {
    var gruntfile = fs.readFileSync('Gruntfile.js', 'utf8');

    gruntfile = gruntfile.split('credentials: grunt.file.readJSON(\'credentials.json\'),');
    if (typeof gruntfile[1] === 'undefined') {
      gruntfile = fs.readFileSync('Gruntfile.js', 'utf8').split('credentials: is_production ? \'\' : grunt.file.readJSON(\'credentials.json\'),')
    }
    gruntfile = gruntfile[1].split(',');
    gruntfile = gruntfile[0].split(':');
    return gruntfile[1].replace(/'| /g, '');
  } catch (err) {
    if (errCallback) {
      return errCallback(err);
    } else { return console.log(err); }
  }
};