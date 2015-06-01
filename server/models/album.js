import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import GeoJSON from 'mongoose-geojson-schema';
let Schema = mongoose.Schema;

let album = new mongoose.Schema({
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

album.plugin(autopopulate);

module.exports = album;
