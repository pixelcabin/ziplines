var api_errors = require('./shopifyAPIErrors');

module.exports = function(storeName, apiKey, apiPassword, callback) {
  var shopify = require('shopify-api')({
    host: storeName + '.myshopify.com',
    auth: apiKey + ':' + apiPassword
  });

  shopify.theme.list(function(err) {
    api_errors(err, storeName, apiKey, apiPassword);

    callback(err);
  });
};