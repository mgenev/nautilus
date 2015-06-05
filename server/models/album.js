import {Schema} from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import GeoJSON from 'mongoose-geojson-schema';
import {SimpleTimestamps} from 'mongoose-SimpleTimestamps';

let album = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'user',
    autopopulate: true
  },
  location: GeoJSON.Point,
  address:String,
  name: String,
  description:String,
  tags : [String]
});

album.plugin(SimpleTimestamps);
album.plugin(autopopulate);

module.exports = album;
