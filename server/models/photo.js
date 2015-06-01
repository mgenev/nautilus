import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import GeoJSON from 'mongoose-geojson-schema';
let Schema = mongoose.Schema;

let photo = new mongoose.Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'user',
    autopopulate: true
  },
  album: {
    type: Schema.ObjectId,
    ref: 'album'
  },
  location: GeoJSON.Point,
  address:String,
  name: String,
  filePath: String,
  thumbPath: String,
  description:String,
  tags : [String]
});

photo.plugin(autopopulate);

module.exports = photo;
