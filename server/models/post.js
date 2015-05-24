const mongoose = require('mongoose');
var schema = new mongoose.Schema({
  title: String,
  content: String
});

var model = mongoose.model('posts', schema);
module.exports =  model;
