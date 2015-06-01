import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import GeoJSON from 'mongoose-geojson-schema';
let Schema = mongoose.Schema;

let vendor = new mongoose.Schema({
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

vendor.plugin(autopopulate);

module.exports = vendor;
