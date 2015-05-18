var fs = require('fs');

module.exports = function(errCallback) {
  try {
    var credentials = fs.readFileSync('credentials.json', 'utf8');
    return JSON.parse(credentials.toString('utf8'));
  } catch (err) {
    if (errCallback) {
      return errCallback(err);
    } else { throw err; }
  }
};