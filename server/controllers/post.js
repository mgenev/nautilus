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
  this.body = 'you passed param '+this.params.id;
}
