import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import GeoJSON from 'mongoose-geojson-schema';
let Schema = mongoose.Schema;

let trip = new mongoose.Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'user',
    autopopulate: true
  },
  name:String,
  description:String,
  startDate: Date,
  endDate: Date,
  locations: [GeoJSON.Point],
  tags: [String],
  photos: [{ type: Schema.Types.ObjectId, ref: 'photo' }]
});

trip.plugin(autopopulate);

module.exports = trip;
