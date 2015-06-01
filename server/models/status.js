import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import GeoJSON from 'mongoose-geojson-schema';
let Schema = mongoose.Schema;

let status = new mongoose.Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'user',
    autopopulate: true
  },
  note:String,
  state:String,
  activity: String,
  location: GeoJSON.Point,
  address:String
});

status.plugin(autopopulate);

module.exports = status;
