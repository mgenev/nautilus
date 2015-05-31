const mongoose = require('mongoose');
module.exports = new mongoose.Schema({
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
