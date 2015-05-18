var api_errors = require('./shopifyAPIErrors');

module.exports = function(storeName, apiKey, apiPassword, repo, callback) {
  var shopify = require('shopify-api')({
    host: storeName + '.myshopify.com',
    auth: apiKey + ':' + apiPassword
  });

  var themeName = repo.split('/')[1].replace(/_/g, ' ');

  // First, count the number of existing themes with a similar name
  shopify.theme.list(function(err, response) {
    if (err) { console.log(err); }

    var themeCount = 0;
    var regex = new RegExp('^' + themeName + '[ ]*[0-9]*');
    for(var i = 0; i < response.themes.length; i++) {
      if (response.themes[i].name.match(regex)) {
        themeCount += 1;
      }
    }

    // Use the themeCount to append an iterated number onto the end of this theme name
    themeName = themeCount > 0 ? themeName + ' ' + (themeCount + 1): themeName;
    var themeSrc = 'https://github.com/' + repo + '/archive/master.zip';
    shopify.theme.create({
      theme: {
        name: themeName,
        src: themeSrc
      }
    }, function(err, result) {
      if (err) {
        api_errors(err, storeName, apiKey, apiPassword);
      }

      if (result) {
        callback(err, result.theme.id, result.theme);
      } else {
        callback(err, null, null);
      }
    });

  });
};