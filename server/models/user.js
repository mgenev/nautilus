const mongoose = require('mongoose');
var schema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
  address: String,
  zipcode: Number,
  lists: Array
});

var model = mongoose.model('users', schema);
module.exports =  model;
