import {Schema} from 'mongoose';
import {SimpleTimestamps} from 'mongoose-SimpleTimestamps';
import mongooseHidden from 'mongoose-hidden';

let user = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  password: String,
  address: String,
  website: String,
  tagline: String,
  zipcode: Number,
  userType: Number
});

user.plugin(SimpleTimestamps);
user.plugin(mongooseHidden({
  defaultHidden: {
    "password": true,
    "__v": true
  }
}));

module.exports = user;
