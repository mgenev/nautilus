import mongoose from 'mongoose';
let post = mongoose.model('post');

module.exports = {
  init(app) {
    app.get('/api/posts/test/:id', test);
  },
  * get_custom(next) {
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
