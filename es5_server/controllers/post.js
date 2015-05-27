'use strict';

module.exports = {
  init: function init(app) {
    app.get('/api/posts/test/:id', test);
  },
  get_custom: function* get_custom() {
    this.body = 'custom post return';
  }
};

var test = function* test() {
  this.body = 'you passed param ' + this.params.id;
};