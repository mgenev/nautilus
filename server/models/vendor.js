import {Schema} from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import GeoJSON from 'mongoose-geojson-schema';
import {SimpleTimestamps} from 'mongoose-SimpleTimestamps';

let vendor = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'user',
    autopopulate: true
  },
  name: String,
  location: GeoJSON.Point,
  description: String,
  address: String,
  urlSegment: String,
  category: String
});

vendor.plugin(SimpleTimestamps);
vendor.plugin(autopopulate);

module.exports = vendor;
