module.exports = {
  * get_custom (next) {
    yield next;
    this.body = 'custom user return';
  }
}
