import {Schema} from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import {SimpleTimestamps} from 'mongoose-SimpleTimestamps';
import permalink from 'mongoose-permalink';

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

post.plugin(permalink, {
    sources: ['title']
});
post.plugin(SimpleTimestamps);
post.plugin(autopopulate);

module.exports = post;
