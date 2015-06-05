import {Schema} from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import GeoJSON from 'mongoose-geojson-schema';
import {SimpleTimestamps} from 'mongoose-SimpleTimestamps';

let event = new Schema({
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

event.plugin(SimpleTimestamps);
event.plugin(autopopulate);

module.exports = event;
