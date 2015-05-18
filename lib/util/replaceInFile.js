var fs = require('fs');

module.exports = function(file, replacements, callback) {
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    var result = data;
    for(var i = 0; i < replacements.length; i++) {
      result = result.replace(replacements[i][0], replacements[i][1]);
    }

    fs.writeFile(file, result, 'utf8', function (err) {
      if (err) { return console.log(err); }
    });

    if (typeof callback != 'undefined') { callback(); }
  });
};