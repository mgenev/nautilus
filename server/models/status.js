import {Schema} from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import GeoJSON from 'mongoose-geojson-schema';
import {SimpleTimestamps} from 'mongoose-SimpleTimestamps';

let status = new Schema({
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

status.plugin(SimpleTimestamps);
status.plugin(autopopulate);

module.exports = status;
