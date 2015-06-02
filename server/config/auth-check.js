module.exports = function () {
  return function* (next) {
    if (this.user.userid > 0) {
      yield next;
    } else {
      this.status = 401;
      this.body = 'Must be logged in to see this!';
    }
  }
}
