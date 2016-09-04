'use strict';

var mandorla = {};
mandorla.nconf = require('./node_configurations/nconf');
mandorla.mongoose = require('./node_configurations/mongoose')(mandorla.nconf);
mandorla.application = require('./node_configurations/express')(mandorla.nconf);

module.exports = mandorla;
