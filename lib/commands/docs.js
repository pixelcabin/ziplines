var open = require('open'),
    pkg = require('../../package.json');

module.exports = function(args, options) {
  open(pkg.repository.url + '/blob/master/readme.md');
};