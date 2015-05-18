var colors = require('colors');

module.exports = function(projectName, options) {
  if (options) {
    return {
      ShopifyAuthenticationError: 'Provided details:\n\tStore Name:\t'.white + projectName.white + '\n\tAPI Key:\t'.red + options.apiKey.blue + '\n\tAPI Password:\t'.red + options.apiPassword.blue
    };

  } else {
    return {
      noRoot: '\n\tHold up a moment\n'.bold.yellow +
      '\t------------------------\n' +
      '\tRunning this installer as an administrator can cause problems.\n' +
      '\tTry running this command again without \'sudo\' or administrator rights.\n',
      helloZiplines: '\n\tThanks for using Ziplines!\n'.blue +
      '\t-------------------------------------\n' +
      '\tWe\'ll now set you up with a new project,\n' +
      '\twe should be done in a minute or two!',
      gitNotInstalled: '\nYou need Git installed to get started. Download it here: ' + 'http://git-scm.com/downloads'.blue + '\n',
      folderExists: '\nThere\'s already a folder named ' + projectName.blue + ' here. Please use a different name or delete that folder.\n',
      downloadingTemplate: '\nDownloading the requested Shopify template...'.blue,
      gitCloneError: 'There was an issue running ' + 'git clone '.blue + 'to download the Pixelcabin Shopify Tools template.\nMake sure your machine\'s Git is configured properly and then try again.',
      installingDependencies: '\nDone downloading!'.green + '\n\nInstalling dependencies...'.blue + '\n',
      gitCloneSuccess: ' \u2713 New project folder created.'.green,
      configSetupSuccess: ' \u2713 Store name and credentials validated and written to config.'.green,
      configSetupFail: ' \u2717 Store name and credentials validated and written to config.'.red,
      installSuccess: '\nYou\'re all set!\n'.blue,
      installFail: '\nThere were some problems during the installation.\n'.blue,
      npmSuccess: ' \u2713 Node modules installed.'.green,
      npmFail: ' \u2717 Node modules not installed.'.red + ' Try running ' + 'npm install'.blue + ' manually.',
      bowerSuccess: ' \u2713 Bower components installed.'.green,
      bowerFail: ' \u2717 Bower components not installed.'.red + ' Try running ' + 'bower install'.blue + ' manually.',
      foundationSuccess: ' \u2713 Foundation components installed.'.green,
      foundationFail: ' \u2717 Foundation components not installed.'.red,
      foundationTimber: 'Unfortunately, Ziplines currently does not support automatically installing Foundation into Timber. Please retry without Foundation, and then manually add once installation is complete.'.yellow,
      gitSuccess: ' \u2713 Git repo initialised.'.green,
      gitFail: ' \u2717 Git repo not initialised.'.red + ' Try running ' + 'git init'.blue + ' manually.',
      installSuccessFinal: '\nA new theme has been created on your store (run ' + 'pxlshopify view'.blue + ' to preview), then start development by running ' + 'grunt watch'.blue + ' while inside the ' + projectName.blue + ' folder.\n',
      installFailFinal: '\nOnce you\'ve resolved the above issues, run ' + 'grunt watch '.blue + 'while inside the ' + projectName.blue + ' folder.\n',
      ShopifyAPIError: 'Either '.yellow + projectName.blue + ' does not exist, or there was a problem communicating with the Shopify API'.yellow,
      themeCreationError: 'Unfortunately, there was an error creating a new theme on your store.\nIf using the default template, this could be a temporary error, which may be resolved by re-running this command.\nOtherwise check that the repo you provided is public and has a suitable zip available on the master branch.'.red,
      themeCreationSuccess: ' \u2713 New theme created on Shopify.'.green,
      noThemeFound: 'Unfortunately we couldn\'t find a theme by that name in your store'.red
    };
  }
};