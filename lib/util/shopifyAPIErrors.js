var colors = require('colors'),
    messages = require('./messages');

module.exports = function(err, storeName, apiKey, apiPassword) {
  if (err) {
    if (err.type == 'ShopifyAuthenticationError') {
      console.log(err.message.red);
      console.log(messages(storeName, {apiKey: apiKey, apiPassword: apiPassword}).ShopifyAuthenticationError);
    } else if (err.type == 'ShopifyInvalidRequestError' && err.detail == '[API] Invalid Username provided for Basic Auth API access') {
      console.log(err.detail.red);
      console.log(messages(storeName, {apiKey: apiKey, apiPassword: apiPassword}).ShopifyAuthenticationError);
    } else if (err.type == 'ShopifyAPIError') {
      console.log(err.message.yellow);
      console.log(messages(storeName).ShopifyAPIError);
    } else if (err.type == 'ShopifyInvalidRequestError' && (err.detail.src == ' is not a valid URL' || err.detail.src == 'is empty')) {
      console.log(messages(storeName).themeCreationError);
    } else {
      console.log(err);
      console.log(err.message.red);
      if (err.detail) { console.log(err.detail); }
    }
  }
};