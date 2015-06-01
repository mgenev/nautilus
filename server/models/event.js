import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import GeoJSON from 'mongoose-geojson-schema';
let Schema = mongoose.Schema;

let event = new mongoose.Schema({
  organizer: {
    type: Schema.ObjectId,
    ref: 'user',
    autopopulate: true
  },
  guests: [{
    type: Schema.ObjectId,
    ref: 'user',
    autopopulate: true
  }],
  location: GeoJSON.Point,
  address:String,
  title: String,
  description: String,
  eventDate: Date
});

event.plugin(autopopulate);

module.exports = event;
