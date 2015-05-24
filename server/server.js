require("babel-core").transform("code");
const koa = require('koa');
const router = require('koa-router');
const logger = require('koa-logger');
const generateApi = require('koa-mongo-rest');
const pluralize = require('pluralize');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nautilus');

const app = koa();
app.use(router(app));
app.use(logger(app));

// load all models and create rest endpoints
var model, schema;
require('fs').readdirSync(__dirname+'/models').forEach(function (name) {
	if (name[0] === '.') return;
	name = name.substring(0, name.length - 3);
	console.log('NAME ', name);
	schema = require('./models/' + name);
	model = mongoose.model(pluralize(name), schema);
	generateApi(app, model, '/api');
});

app.listen(process.env.PORT || 3000);
