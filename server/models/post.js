import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
let Schema = mongoose.Schema;

let post = new mongoose.Schema({
  title: String,
  content: String,
  user: {
    type: Schema.ObjectId,
    ref: 'user',
    autopopulate: true
  },
  tags: Array
});

post.plugin(autopopulate);

module.exports = post;
