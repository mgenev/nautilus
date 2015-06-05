import {Schema} from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import {SimpleTimestamps} from 'mongoose-SimpleTimestamps';

let post = new Schema({
  title: String,
  content: String,
  user: {
    type: Schema.ObjectId,
    ref: 'user',
    autopopulate: true
  },
  tags: Array
});

post.plugin(SimpleTimestamps);
post.plugin(autopopulate);

module.exports = post;
