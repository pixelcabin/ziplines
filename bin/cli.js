#!/usr/bin/env node

var nopt       = require('nopt');
var update     = require('update-notifier');
var pkg        = require('../package.json');
var ziplines   = require('../lib');

// Options that can be passed to commands
// --version will show the version of the CLI
var options = {
  'version': String,
  'debug': Boolean,
  'foundation': Boolean,
  'live': Boolean,
  'timber': Boolean
};
// -v is a shorthand for --version
var shorthands = {
  'v': '--version'
};
var parsed = nopt(options, shorthands);

// cmd.args contains basic commands like "new" and "help"
// cmd.opts contains options, like --foundation and --version
var cmd = {
  args: parsed.argv.remain,
  opts: parsed
};

// Check for updates once a day
var notifier = update({
  packageName: pkg.name,
  packageVersion: pkg.version
});
notifier.notify();

// No other arguments given
if (typeof cmd.args[0] === 'undefined') {
  // If -v or --version was passed, show the version of the CLI
  if (typeof cmd.opts.version !== 'undefined') {
    process.stdout.write('Ziplines version ' + require('../package.json').version + '\n');
  } else { // Otherwise, just show the help screen
    ziplines.help();
  }
} else { // Arguments given
  // If the command typed in doesn't exist, show the help screen
  if (typeof ziplines[cmd.args[0]] == 'undefined') {
    ziplines.help();
  } else { // Otherwise, just run it already!
    // Every command function is passed secondary commands, and options
    // So if the user types "ziplines new storename --foundation", "storename" is a secondary command, and "--foundation" is an option
    ziplines[cmd.args[0]](cmd.args.slice(1), cmd.opts);
  }
}