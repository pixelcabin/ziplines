#!/usr/bin/env node

var colors = require('colors');

var msg = '\n\tThanks for installing ' + 'Ziplines'.blue + '!\n' +
        '\t------------------------------------------\n' +
        '\t\t~\n' +
        '\t\t    ~\n' +
        '\t\t        ~\n' +
        '\t\t        |   ~\n' +
        '\t\t       ' + '{ }'.yellow + '      ~\n' +
        '\t\t                    ~\n' +
        '\t\t                        ~\n' +

        '\tType ' + 'ziplines help new'.blue +' to get started,\n' +
        '\tor ' + 'ziplines help'.blue +' to see every command.\n' +
        '\n' +
        '\tFind us on Twitter as ' + '@pixelcabin'.blue + '\n'
    ;

console.log(msg);