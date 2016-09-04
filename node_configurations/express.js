'use strict';

module.exports = function(nconf) {

  var express = require('express');
  var application = express();

  var helmet = require('helmet');
  application.use(helmet());

  var session = require('express-session');
  var redis = require('connect-redis')(session);
  application.use(session({
    store: new redis(),
    secret: nconf.get('session:secret'),
    resave: false,
    saveUninitialized: true,
  }));

  var bodyparser = require('body-parser');
  application.use(bodyparser.urlencoded({ extended: true }));
  application.use(bodyparser.json());

  var compression = require('compression');
  application.use(compression());

  var morgan = require('morgan-debug');
  application.use(morgan('express', 'dev'));

  application.set('view engine', 'pug');
  application.set('views', './src/views');

  var paths = require('bourbon').includePaths;
  paths = paths.concat(require('bourbon-neat').includePaths)

  var sass = require('node-sass-middleware');
  application.use(sass({
    src: './src/views',
    dest: './node_statics',
    includePaths: paths,
    debug: true,
    outputStyle: 'compressed',
  }));

  application.use(express.static('./node_statics'));

  return application;
}
