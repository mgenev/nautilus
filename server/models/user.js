import {Schema} from 'mongoose';
import {SimpleTimestamps} from 'mongoose-SimpleTimestamps';
import mongooseHidden from 'mongoose-hidden';
import mongooseBcrypt from 'mongoose-bcrypt';

let user = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  password: { type: String, required: true, bcrypt: true },
  address: String,
  website: String,
  tagline: String,
  zipcode: Number,
  userType: Number
});

user.plugin(mongooseBcrypt);
user.plugin(SimpleTimestamps);
user.methods.toJSON = function() {
  var obj = this.toObject()
  delete obj.password;
  return obj;
};

module.exports = user;
