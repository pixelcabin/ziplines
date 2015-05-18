var fs = require('fs');

module.exports = function(src, dest, cb) {
  fs.createReadStream(src)
    .pipe(fs.createWriteStream(dest))
    .on('finish', function() {
      if (typeof cb != 'undefined') { cb(); }
    });
};