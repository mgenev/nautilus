import mongoose from 'mongoose';
import mongooseHidden from 'mongoose-hidden';
let Schema = mongoose.Schema;

let user = new mongoose.Schema({
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

user.plugin(mongooseHidden({
  defaultHidden: {
    "password": true,
    "__v": true
  }
}));

module.exports = user;
