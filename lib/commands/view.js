var open = require('open'),
    util = require('../util');

module.exports = function(args, options) {
  var domain = util.getStoreDomainSync();
  var domain_root = 'http://' + domain + '/?preview_theme_id=';
  if (typeof args[0] === 'undefined' && options.live) {
    open(domain_root);
  } else {
    var jsonResult = util.readCredentialsSync();

    if (typeof args[0] === 'undefined') {
      open(domain_root + jsonResult.theme_id);
    } else {
      var shopify = require('shopify-api')({
        host: domain,
        auth: jsonResult.api_key + ':' + jsonResult.password
      });

      shopify.theme.list(function(err, response) {
        if (err) { console.log(err); }
        for(var i = 0; i < response.themes.length; i++) {
          if (response.themes[i].name == args[0]) {
            open(domain_root + response.themes[i].id);
            return;
          }
        }
        console.log(util.messages(domain).noThemeFound);
      });
    }
  }
};