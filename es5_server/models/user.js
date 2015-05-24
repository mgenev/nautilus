'use strict';

var mongoose = require('mongoose');
module.exports = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
  address: String,
  zipcode: Number,
  lists: Array
});