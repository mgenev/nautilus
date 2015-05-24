'use strict';

var config = require('./config/environment'),
    koaConfig = require('./config/koa'),
    co = require('co'),
    koa = require('koa'),
    app = koa(),
    mongoose = require('mongoose');

module.exports = app;

/**
 * Initializes koa server. Returns a promise.
 */
app.init = function () {
  // connect to mongo
  mongoose.connect('mongodb://localhost/nautilus');
  // set up koa
  koaConfig(app);
  // lift server
  app.server = app.listen(config.app.port);
  if (config.app.env !== 'test') {
    console.log('Koa server up on port ' + config.app.port);
  }
};

// auto init if this app is not being initialized by another module (i.e. using require('./app').init();)
if (!module.parent) {
  try {
    app.init();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}