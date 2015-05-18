var async  = require('async')
    , bower  = require('bower')
    , colors = require('colors')
    , exec   = require('exec')
    , fs     = require('fs')
    , isRoot = require('is-root')
    , npm    = require('npm')
    , path   = require('path')
    , rimraf = require('rimraf')
    , which  = require('which').sync
    , util   = require('../util')
    , git    = require('simple-git')
    , inquirer = require('inquirer');


module.exports = function(args, options) {

  // -3. Stop if the process is being run as root
  if (isRoot()) {
    console.log(messages.noRoot);
    process.exit(1);
  }

  // -2. Check that the user has git installed
  try {
    which('git');
  } catch (e) {
    console.log(messages.gitNotInstalled);
    process.exit(1);
  }

  // -1. Delete the test folder if running the test script
  if (options.debug) {
    rimraf.sync('test');
  }

  // 0. Switch to interactive if arguments entered incorrectly
  if (typeof args[0] === 'undefined' || typeof args[1] === 'undefined' || typeof args[2] === 'undefined') {
    var questions = [
      {
        type: 'input',
        name: 'storeName',
        message: 'What is the name of your store?',
        validate: function (value) {
          var pass = value.match(/^[A-z0-9\-\_]+/i);
          if (pass) {
            return true;
          } else {
            return "Please enter the name of your shopify store, excluding .myshopify.com";
          }
        }
      },
      {
        type: 'input',
        name: 'apiKey',
        message: 'What is the api key?',
        validate: function (value) {
          var pass = value.match(/^[A-z0-9]+/i);
          if (pass) {
            return true;
          } else {
            return "Please enter the api key of the private app you have created (alphanumeric)";
          }
        }
      },
      {
        type: 'password',
        name: 'apiPassword',
        message: 'What is the api password?',
        validate: function (value) {
          var pass = value.match(/^[A-z0-9]+/i);
          if (pass) {
            return true;
          } else {
            return "Please enter the api password of the private app you have created (alphanumeric)";
          }
        }
      },
      {
        type: 'confirm',
        name: 'foundation',
        message: 'Would you like to include foundation?',
        default: false
      }
    ];

    inquirer.prompt(questions, function (answers) {
      run_installer(options, answers, args);
    });
  } else {
    var answers = {
      storeName: args[0],
      apiKey: args[1],
      apiPassword: args[2],
      foundation: options.foundation
    };
    run_installer(options, answers, args);
  }
};


// `new` helper functions
//------------------------------------------------
var run_installer = function(options, answers, args) {
  util.validateCredentials(answers.storeName, answers.apiKey, answers.apiPassword, function(err) {
    if (err) {
      // Errors logged by validateCredentials
    } else {
      // Continue with install
      var messages = util.messages(answers.storeName);
      var projectFolder = path.join(process.cwd(), answers.storeName);
      var repo;
      if (args[3]) {
        repo = args[3];
      } else if (options.timber) {
        if (answers.foundation) {
          console.log(messages.foundationTimber);
          process.exit(1);
        }
        repo = 'pixelcabin/timber';
      } else {
        repo = 'pixelcabin/pxl_shopify_template_public_draft';
      }

      var gitClone = ['git', 'clone', 'git@github.com:' + repo + '.git', answers.storeName];

      // 1. Check if the folder already exists
      if (fs.existsSync(projectFolder)) {
        console.log(messages.folderExists);
        process.exit(1);
      }

      // 2. Greet the user!
      console.log(messages.helloZiplines);
      process.stdout.write(messages.downloadingTemplate);

      // 3. Clone the template repo
      exec(gitClone, function(err, out, code) {
        if (err instanceof Error) {
          console.log(messages.gitCloneError);
          process.exit(1);
        }

        // Change the cwd to the new project folder
        process.chdir(answers.storeName);


        // Write the store name / credentials
        util.replaceInFile('Gruntfile.js', [[/url: '',/g, 'url: \'' + answers.storeName + '.myshopify.com\',']]);

        util.createTheme(answers.storeName, answers.apiKey, answers.apiPassword, repo, function(err, theme_id) {
          if (err) {
            process.chdir('..');
            rimraf(answers.storeName, function(rferr) {
              if (rferr && rferr.code === 'ENOTEMPTY') {
                setTimeout(function() {
                  rimraf(answers.storeName, function(rferr) {
                    if (options.debug) { console.log(rferr); }
                    process.exit(1);
                  });
                }, 1000);
              } else {
                if (options.debug) { console.log(rferr); }
                process.exit(1);
              }
            });
          } else {

            fs.readFile('credentials_template.json', 'utf8', function (err, data) {
              if (err) { throw err; }

              var jsonResult = JSON.parse(data.toString('utf8'));
              jsonResult.api_key = answers.apiKey;
              jsonResult.password = answers.apiPassword;
              jsonResult.theme_id = theme_id.toString();

              util.writeCredentialsSync(jsonResult);
            });
          }
        });

        // For debugging: force an npm error
        // rimraf('package.json', function() {});

        // 7. Install dependencies
        console.log(messages.installingDependencies);

        var installers = [];

        installers.push(function(callback) {
          npm.load({ prefix: process.cwd(), loglevel: 'error', loaded: false }, function(err) {
            npm.commands.install([], function(err, data) {
              if (options.debug && err) { console.log(err); }
              var success = err === null;
              callback(null, success);
            });
          });
        });

        installers.push(function(callback) {
          if (answers.foundation) {
            installFoundation(options, callback);
          } else {
            installBower(options, callback);
          }
        });

        installers.push(function(callback) {
          console.log('\n-----------------------------------\n');
          console.log('Uploading additional files to Shopify theme (this can take up to a few minutes)'.blue);
          exec(['grunt', 'sass:development'], function (err, out, code) {
            if (err) {
              console.log(err);
            } else {
              exec(['grunt', 'uglify'], function (err, out, code) {
                if (err) {
                  console.log(err);
                } else {
                  exec(['grunt', 'shopify:upload'], function (err, out, code) {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log('Upload complete.'.green);
                      var success = err === '';
                      callback(null, success);
                    }
                  });
                }
              });
            }
          });
        });

        installers.push(function(callback) {
          // 8. Remove the Git folder
          rimraf('.git', function() {
            git().init().add('./*').commit('Initialised repository');
            callback(null, true);
          });
        });

        async.series(installers, function(err, results) {
          var allGood = results.indexOf(false) === -1;
          if (allGood) {
            console.log(messages.installSuccess);
          } else {
            console.log(messages.installFail);
          }

          console.log(messages.gitCloneSuccess);
          console.log(messages.configSetupSuccess);
          console.log(messages.themeCreationSuccess);

          if (results[0]) {
            console.log(messages.npmSuccess);
          } else {
            console.log(messages.npmFail);
          }

          if (results[1]) {
            console.log(messages.bowerSuccess);
            if (answers.foundation) {
              console.log(messages.foundationSuccess);
            }
          } else {
            console.log(messages.bowerFail);
          }

          if (results[2]) {
            console.log(messages.gitSuccess);
          } else {
            console.log(messages.gitFail);
          }

          if (allGood) {
            console.log(messages.installSuccessFinal);
          } else {
            console.log(messages.installFailFinal);
          }

        });
      });
    }
  });
};

var installBower = function(answers, callback) {
  bower.commands.install(
      undefined,
      undefined,
      { cwd: process.cwd(), silent: true, quiet: true, production: true }
  ).on('err', function(err) {
        callback(null, false);
      }
  ).on('end', function(data) {
        if (answers.foundation) {
          copyFoundationFiles();
          callback(null, true);
        } else {
          callback(null, true);
        }
      }
  );
};

var installFoundation = function(answers, callback) {
  console.log('Adding Foundation');
  exec(['bower', 'install', 'foundation', '-S'], function (err, out, code) {
    if (err instanceof Error) {
      console.log(err);
      process.exit(1);
      callback(null, false);

    }
    var path = 'src/scss/application.scss';
    var insert = '@import \'foundation_settings\';\n@import \'normalize\';\n@import \'foundation\';\n';
    insertIntoFile(path, insert);
    path = 'src/js/app/core.js';
    insert = '$(function() { $(document).foundation(); });\n';
    insertIntoFile(path, insert);

    installBower(answers, callback);
  });
};

var copyFoundationFiles = function() {
  util.copyFile('bower_components/foundation/scss/foundation/_settings.scss', 'src/scss/_foundation_settings.scss', function () {});
  util.copyFile('bower_components/foundation/js/foundation.min.js', 'src/js/third_party/foundation.min.js', function () {});
  fs.readdir('bower_components/foundation/js/vendor/', function(err, files) {
    for (var i = 0; i < files.length; i++) {
      if (files[i] != 'jquery.js') {
        util.copyFile('bower_components/foundation/js/vendor/' + files[i], 'src/js/third_party/' + files[i]);
      }
    }
  });
};

var insertIntoFile = function(path, insert) {
  fs.readFile(path, 'utf8', function (err, data) {
    if (err) { return console.log(err); }
    if (data.indexOf(insert) == -1) {
      var prepended = insert + data;

      fs.writeFileSync(path, prepended, 'utf8', function (err) {
        if (err) { return console.log(err); }
      });
    } else { console.log('Foundation references already installed.'); }
  });
};