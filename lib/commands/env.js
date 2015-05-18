var util = require('../util'),
    colors = require('colors');

module.exports = function(args, options) {
  var environment;
  if (args[0] == 'production' || args[0] == 'p') {
    environment = 'production';
  } else {
    environment = 'development';
  }

  util.replaceInFile('Gruntfile.js', [[/environment: '[a-z]+',/g, 'environment: \'' + environment + '\',']]);
  var env = environment === 'development' ? environment.blue : environment.green;
  console.log('Switched compile tools to ' + env);
};