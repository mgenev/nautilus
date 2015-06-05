import {Schema} from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import GeoJSON from 'mongoose-geojson-schema';
import {SimpleTimestamps} from 'mongoose-SimpleTimestamps';

let trip = new Schema({
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

trip.plugin(SimpleTimestamps);
trip.plugin(autopopulate);

module.exports = trip;
