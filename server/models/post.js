const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      autopopulate = require('mongoose-autopopulate');

let post = new mongoose.Schema({
  title: String,
  content: String,
  user: {
    type: Schema.ObjectId,
    ref: 'user',
    autopopulate: true
  }
});

post.plugin(autopopulate);

module.exports = post;
