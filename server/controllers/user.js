module.exports = {
  get_custom: function* (next) {
    yield next;
    this.body = 'custom user return';
  }
}
