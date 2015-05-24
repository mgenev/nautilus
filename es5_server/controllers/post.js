/**
 * Post controller for serving user posts.
 */
'use strict';

var route = require('koa-route');

// register koa routes
exports.init = function (app) {
  app.get('/api/posts/custom', custom);
};

function* custom() {
  this.body = 'custom post return';
}