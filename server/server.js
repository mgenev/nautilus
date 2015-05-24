require("babel-core").transform("code");
const koa = require('koa');
const router = require('koa-router');
const logger = require('koa-logger');
const generateApi = require('koa-mongo-rest');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nautilus');

const app = koa();
app.use(router(app));
app.use(logger(app));
var model;
require('fs').readdirSync(__dirname+'/models').forEach(function (name) {
	if (name[0] === '.') return;
	model = require('./models/' + name);
	generateApi(app, model, '/api');
});

app.listen(process.env.PORT || 3000);
