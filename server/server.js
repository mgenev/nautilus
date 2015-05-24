const config = require('./config/environment'),
    koaConfig = require('./config/koa'),
    co = require('co'),
    koa = require('koa'),
    app = koa(),
		mongoose = require('mongoose');

module.exports = app;

/**
 * Initializes koa server. Returns a promise.
 */
app.init = co.wrap(function *() {
	// connect to mongo
	mongoose.connect('mongodb://localhost/nautilus');
  // set up koa
  koaConfig(app);
  // lift server
  app.server = app.listen(config.app.port);
  if (config.app.env !== 'test') {
    console.log('Koa server up on port ' + config.app.port);
  }
});

// auto init if this app is not being initialized by another module (i.e. using require('./app').init();)
if (!module.parent) {
  app.init().catch(function (err) {
    console.error(err.stack);
    process.exit(1);
  });
}
