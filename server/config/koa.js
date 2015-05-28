const fs = require('fs'),
    logger = require('koa-logger'),
    send = require('koa-send'),
    cors = require('koa-cors'),
    jwt = require('koa-jwt'),
    bodyParser = require('koa-bodyparser'),
    router = require('koa-router'),
    config = require('./environment'),
    generateApi = require('koa-mongo-rest'),
    pluralize = require('pluralize'),
    mongoose = require('mongoose');


module.exports = function (app) {
  // middleware configuration
  app.use(router(app));
  app.use(logger());
  app.use(responseTime);
  app.use(cors());
  app.use(bodyParser());

  // middleware below this line is only reached if jwt token is valid
  // TODO enable jwt auth app.use(jwt({secret: config.app.secret}));

  // create all models first so controllers have them available
  let model, schema;
  for (let name of require('fs').readdirSync(__dirname+'/../models')) {
    if (name[0] === '.') return;
    name = name.substring(0, name.length - 3);
    schema = require('../models/' + name);
    model = mongoose.model(pluralize(name), schema);
  };

  // auto mount all the simple routes defined in the api controllers
  // initialize complex custom defined routes
  for (let fileName of fs.readdirSync(__dirname+'/../controllers')) {
    let controller = require(__dirname+'/../controllers/' + fileName);
    fileName = fileName.substring(0, fileName.length - 3);
    for (let propName in controller) {
      if (propName === 'init') {
        controller.init(app);
      } else {
        let arr = propName.split("_");
        let methodName = arr[0];
        let handlerName = arr[1];
        app[methodName](`/${config.app.apiPrefix}/${pluralize(fileName)}/${handlerName}`, controller[propName]);
      }
    }
  };

  // mount REST routes for all models last so it doesn't override
  for (let model of mongoose.modelNames()){
    generateApi(app, mongoose.model(model), '/' + config.app.apiPrefix);
  }
};

function *responseTime(next) {
  var start = new Date;
  yield next;
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
}
