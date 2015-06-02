import jwt from 'jsonwebtoken';
import config from '../config/environment';
import mongoose from 'mongoose';
let User = mongoose.model('user');

module.exports = {
  * post_login (next) {
    yield next;
    let credentials = this.request.body;
    let user = yield User.findOne({email: credentials.email}, {email: 1, name: 1, password: 1});
    if (!user) {
      this.throw(401, 'Incorrect e-mail address.');
    } else if (user.password !== credentials.password) {
      this.throw(401, 'Incorrect password.');
    } else {
      // todo see how to do this in the schema for all user gets
      delete user.password;
      user.picture = '/api/users/' + user.id + '/picture';
    }

    // sign and send the token along with the user info
    let token = jwt.sign(user, config.app.secret, {expiresInMinutes: 90 * 24 * 60 /* 90 days */});
    this.body = {token,user};
  },
  * post_register (next) {
    yield next;
    try {
      let result = yield User.create(this.request.body);
      this.status = 201;
      return this.body = result;
    } catch (err) {
      return this.body = err;
    }
  }
}
