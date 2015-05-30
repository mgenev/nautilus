const mongoose = require('mongoose'),
      post = mongoose.model('post');

module.exports = {
  init: function (app) {
    app.get('/api/posts/test/:id', test);
  },
  get_custom: function* (next) {
    yield next;
    this.body = 'custom post return';
  }
}

let test = function* (next) {
  yield next;
  try {
    let result = yield post.findById(this.params.id).exec();
    return this.body = result;
  } catch (err) {
    this.status = 404;
    return this.body = err;
  }
}
