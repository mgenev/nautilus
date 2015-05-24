/**
 * Post controller for serving user posts.
 */
var route = require('koa-route');

// register koa routes
exports.init = function (app) {
  app.get('/api/posts/custom', custom);
};

async function custom () {
  this.body = 'custom post return';
}
