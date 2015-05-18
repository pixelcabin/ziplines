var util = require('../util'),
    fs = require('fs'),
    colors = require('colors');

module.exports = function(args, options) {
  // If not in ziplines folder, break with message
  var credentials;
  try {
    credentials = util.readCredentialsSync();
    fs.readFileSync('Gruntfile.js', 'utf8');
  } catch (err) {
    if (err.errno === 34) {
      console.log('No Ziplines config found in this folder'.yellow);
      process.exit(1);
    } else {
      console.log(err);
    }
  }

  // Gather store settings
  var domain = util.getStoreDomainSync();
  var env = util.readEnvSync();

  // Output result
  var apiKey = credentials.api_key ? credentials.api_key.blue : 'Missing'.red;
  var apiPassword = credentials.password ? credentials.password.blue : 'Missing'.red;
  var themeID = credentials.theme_id ? credentials.theme_id.blue : 'Missing'.red;
  env = env === 'development' ? env.blue : env.green;
  console.log('\tZiplines config for ' + domain.blue + '\n' +
      '\n\t----------------------------------------------------' +
      '\n\tTheme ID:\t' + themeID +
      '\n\tEnvironment:\t' + env +
      '\n\tAPI Key:\t' + apiKey +
      '\n\tAPI Password:\t' + apiPassword
  );
};