import fs from 'fs';
import logger from 'koa-logger';
import send from 'koa-send';
import cors from 'kcors';
import jwt from 'koa-jwt';
import conditional from 'koa-conditional-get';
import etag from 'koa-etag';
import router from'koa-router';
import config from './environment';
import generateApi from 'koa-mongo-rest';
import pluralize from 'pluralize';
import mongoose from 'mongoose';

module.exports = function (app) {
  // middleware configuration
  app.use(cors());
  app.use(conditional());
  app.use(etag());
  app.use(router(app));
  app.use(logger());
  app.use(responseTime);

  // middleware below this line is only reached if jwt token is valid
  // TODO enable jwt auth app.use(jwt({secret: config.app.secret}));

  // create all models first so controllers have them available
  let model, schema;
  for (let name of require('fs').readdirSync(__dirname+'/../models')) {
    if (name[0] === '.') return;
    name = name.substring(0, name.length - 3);
    schema = require('../models/' + name);
    model = mongoose.model(name, schema);
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

  // mount REST routes for all models last so it doesn't override the controller methods
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
