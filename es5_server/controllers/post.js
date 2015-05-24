/**
 * Post controller for serving user posts.
 */
'use strict';

var route = require('koa-route');

// register koa routes
exports.init = function (app) {
  app.get('/api/posts/custom', custom);
};

function custom() {
  return regeneratorRuntime.async(function custom$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        this.body = 'custom post return';

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}