import jwt from 'jsonwebtoken';
module.exports = function* (next) {
    let authHeader, token, elements, scheme;
    authHeader = this.get('Authorization');

    if (authHeader) {
      elements = authHeader.split(' ');
      if (elements.length === 2) {
        scheme = elements[0];
        if (scheme === 'Bearer') {
          token = elements[1];
          try {
            console.log('YES TOKEN');
            this.user = jwt.verify(token, secret);
          } catch (err) {
            console.log('NO TOKEN');
          }
        }
      }
    }
    this.user = this.user || {};
    yield next;
}
