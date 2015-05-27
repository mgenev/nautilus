'use strict';

var fs = require('fs'),
    logger = require('koa-logger'),
    send = require('koa-send'),
    jwt = require('koa-jwt'),
    cors = require('koa-cors'),
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
  app.use(cors({
    maxAge: config.app.cacheTime / 1000,
    credentials: true,
    methods: 'GET, HEAD, OPTIONS, PUT, POST, DELETE',
    headers: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  }));
  app.use(bodyParser());

  // middleware below this line is only reached if jwt token is valid
  // TODO enable jwt auth app.use(jwt({secret: config.app.secret}));

  // auto mount all the simple routes defined in the api controllers
  // initialize complex custom defined routes
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = fs.readdirSync(__dirname + '/../controllers')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var fileName = _step.value;

      var controller = require(__dirname + '/../controllers/' + fileName);
      fileName = fileName.substring(0, fileName.length - 3);
      for (var propName in controller) {
        if (propName === 'init') {
          controller.init(app);
        } else {
          var arr = propName.split('_');
          var methodName = arr[0];
          var handlerName = arr[1];
          app[methodName]('/' + config.app.apiPrefix + '/' + pluralize(fileName) + '/' + handlerName, controller[propName]);
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  ;

  // mount REST routes for all models
  var model = undefined,
      schema = undefined;
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = require('fs').readdirSync(__dirname + '/../models')[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _name = _step2.value;

      if (_name[0] === '.') return;
      _name = _name.substring(0, _name.length - 3);
      schema = require('../models/' + _name);
      model = mongoose.model(pluralize(_name), schema);
      generateApi(app, model, '/' + config.app.apiPrefix);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2['return']) {
        _iterator2['return']();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  ;
};