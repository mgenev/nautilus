module.exports = {
  init: function (app) {
    app.get('/api/posts/test/:id', test);
  },
  get_custom: function* () {
    this.body = 'custom post return';
  }
}

let test = function* () {
  this.body = 'you passed param '+this.params.id;
}
