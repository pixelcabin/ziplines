var colors = require('colors'),
    pkg = require('../../package.json');

var helpText = {
  // Each command is an array of strings
  // To print the command, the array is joined into one string, and a line break is added
  // between each item. Basically, each comma you see becomes a line break.
  'default': [
    'Commands:',
    '  new'.blue + '            Create a new project using a standard blank template',
    '  clone'.grey + '          [COMING SOON]'.yellow + ' Clones an existing project and sets up configs'.grey,
    '  status'.blue + '         Outputs the Ziplines config for the current folder',
    '  view'.blue + '           Open your theme in your browser',
    '  admin'.blue + '          Open the store\s Shopify admin in your browser',
    '  docs'.blue + '           Open the documentation for this tool in your browser',
    '  env'.blue + '            Switch the build tools environment',
    '  store_setup'.blue + '    Various Shopify shortcuts to speed up new store setup',
    '  help'.blue + '           Show this screen',
    '  -v'.blue + '             Display the CLI\'s version',
    '',
    'To learn more about a specific command, type ' + 'ziplines help <command>'.blue,
    '',
    'Need more help? Raise an issue on the repo: ' + pkg.bugs.url.blue
  ],
  'new': [
    'Usage:',
    '  ziplines new <store-name> <api_key> <api_password> <theme_id> [--foundation|--timber]'.blue,
    '',
    'Creates a new project using our blank Ziplines template.',
    'Include the optional ' + '--foundation'.blue + ' flag to install with latest Foundation, or ' + '--timber'.blue + ' to install with Shopify\'s Timber template',
    'If no arguments are provided, these will be requested interactively.',
    '',
    'Also supports providing alternate template repo as fourth argument'
  ],
  /* 'clone': [
   'Usage:',
   '  ziplines new <name> <api_key> <api_password> <theme_id>',
   '',
   'Clones an existing project and sets up configs.'
   ],*/
  'view': [
    'Usage:',
    '  ziplines view [theme_name|--live]'.blue,
    '',
    'Opens your theme in your browser, based on the theme_id in credentials.json.',
    '',
    'Optional: can open any theme on your store by passing the theme name as the first argument.',
    'i.e. If wanting to view a theme called \'Staging\', simply run',
    '  ziplines view Staging'.blue,
    '',
    'Optional: ' + '--live'.blue + ' will open the live theme.'
  ],
  'admin': [
    'Usage:',
    '  ziplines admin [--store=STORE_NAME]'.blue,
    '',
    'Open the store\'s Shopify admin in your browser',
    '',
    'Optional: can open any subpage of your store\'s admin by passing the page name as the first argument.',
    'i.e. If wanting to view the products admin page, run',
    '  ziplines admin products'.blue,
    '',
    'Optional: to jump directly to your current theme\'s theme settings page, pass in ' + 'customize'.blue +' (or ' + 'c'.blue + ')',
    'e.g.',
    '  ziplines admin themes customize'.blue,
    '',
    'Optional: [--store=STORE_NAME]'
  ],
  'env': [
    'Usage:',
    '  ziplines env <environment>'.blue,
    '',
    'Switch the built tools environment between development and production',
    'Available arguments: ' + 'development'.blue + ' (or ' + 'd'.blue + '), and ' + 'production'.blue + ' (or ' + 'p'.blue + ')',
    'Important - requires a restart of grunt watch after execution'
  ],
  'store_setup': [
    'Usage:',
    '  ziplines store_setup <command>'.blue,
    '',
    'Available commands: ',
    '  new_store'.blue,
    '  new_app [--store=STORE_NAME]'.blue,
    '  show_apps [--store=STORE_NAME]'.blue,
    '',
    'new_store'.blue + ' - shortcut to the new dev store page [ONLY AVAILABLE IF YOU HAVE A PARTNER ACCOUNT]',
    'new_app [--store=STORE_NAME]'.blue + ' - shortcut to the new private app page, where ' + 'STORE_NAME'.white + ' is the name of the store',
    'show_apps [--store=STORE_NAME]'.blue + ' - shortcut to the private apps page, where ' + 'STORE_NAME'.white + ' is the name of the store'
  ],
  'status': [
    'Outputs the Ziplines config for the current folder'
  ],
  'docs': [
    'Open the documentation for this tool in your browser'
  ],
  'help': [
    'Okay, don\'t get clever. But seriously:',
    '',
    'Usage:',
    '  ziplines help',
    '  ziplines help <command>',
    '',
    'Type ' + 'ziplines help'.blue + ' to see a list of every command,',
    'or ' + 'ziplines help <command>'.blue + ' to learn how a specific command works.'
  ]
};

module.exports = function(args, options) {
  var say;
  if (typeof args === 'undefined' || args.length === 0) {
    say = 'default';
  }
  else {
    say = args[0];
  }
  if (helpText[say] != null) {
    // A line break is added before and after the help text for good measure
    say = '\n' + helpText[say].join('\n') + '\n\n';
    process.stdout.write(say);
  } else {
    var error = '\n\''.red + say.red + '\' does not match any of the available commands.'.red;
    console.log(error);
    console.log('\n' + helpText['default'].join('\n') + '\n\n');
  }
};