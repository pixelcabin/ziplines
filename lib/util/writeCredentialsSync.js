var fs = require('fs');

module.exports = function(credentials) {
  fs.writeFileSync('credentials.json', JSON.stringify(credentials, null, '\t'));
};