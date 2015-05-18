var open = require('open'),
    util = require('../util');

module.exports = function(args, options) {
  var subpage = args[0] ? '/' + args[0] : '';

  if (options.store) {
    open('https://' + options.store + '.myshopify.com/admin' + subpage);
  } else {
    open('https://' + util.getStoreDomainSync() + '/admin' + subpage);
  }
};