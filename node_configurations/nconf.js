'use strict';

var nconf = require('nconf');
nconf.argv().env();

if(process.env.NODE_ENV === 'production') nconf.file({
  file: './src/configurations/production.json'
});
else nconf.file({
  file: './src/configurations/develop.json'
});

module.exports = nconf;
