'use strict';

var mongoose = require('mongoose');
module.exports = new mongoose.Schema({
  title: String,
  content: String
});