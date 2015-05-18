var open = require('open'),
    util = require('../util');

module.exports = function(args, options) {
  switch (args[0]) {
    case 'new_app':
      if (options.store) {
        open('https://' + options.store + '.myshopify.com/admin/apps/private/new');
      } else {
        open('https://' + util.getStoreDomainSync() + '/admin/apps/private/new');
      }
      break;

    case 'show_apps':
      if (options.store) {
        open('https://' + options.store + '.myshopify.com/admin/apps/private');
      } else {
        var domain = util.getStoreDomainSync();
        if (domain) {
          open('https://' + util.getStoreDomainSync() + '/admin/apps/private');
        }
      }
      break;

    case 'new_store':
      open('https://app.shopify.com/services/partners/dev_shops/new');
      break;

    default:
      console.log('error');
      break;
  }
};