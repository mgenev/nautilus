const mongoose = require('mongoose');
var schema = new mongoose.Schema({
  title: String,
  content: String
});

var model = mongoose.model('post', schema);
module.exports =  model;
