var open = require('open'),
    util = require('../util');

module.exports = function(args, options) {
  var subpage = args[0] ? '/' + args[0] : '';
  if (args[1] == 'customize' || args[1] == 'c') {
    subpage = subpage + '/' + util.readCredentialsSync().theme_id + '/editor'
  }

  if (options.store) {
    open('https://' + options.store + '.myshopify.com/admin' + subpage);
  } else {
    open('https://' + util.getStoreDomainSync() + '/admin' + subpage);
  }
};