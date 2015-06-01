import config from './config/environment';
import koaConfig from './config/koa';
import co from 'co';
import koa from 'koa';
import mongoose from 'mongoose';

let app = koa();
module.exports = app;

app.init = () => {
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
