'use strict';

module.exports = function(nconf) {
  var mongoose = require('mongoose');
  var debug = require('debug')('mongoose');

  mongoose.connection.on('connected', function() {
    debug('Connected');
  });

  mongoose.connection.on('error', function(error) {
    debug('Error: %s', error);
  });

  mongoose.connection.on('disconnected', function() {
    debug('Disconnected');
  });

  process.once('SIGUSR2', function() {
    debug('Closing connection SIGUSR2');
    mongoose.connection.close();
    process.kill(process.pid, 'SIGUSR2');
  });

  process.once('SIGINT', function() {
    debug('Closing connection SIGINT');
    mongoose.connection.close();
    process.exit(0);
  });

  process.once('SIGTERM', function() {
    debug('Closing connection SIGTERM');
    mongoose.connection.close();
    process.exit(0);
  });

  mongoose.connect(nconf.get('mongoose:url'));
  return mongoose;
}
