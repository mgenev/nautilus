import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import {SimpleTimestamps} from 'mongoose-SimpleTimestamps';

let Schema = mongoose.Schema;

let service = new mongoose.Schema({
  vendor: {
    type: Schema.ObjectId,
    ref: 'vendor',
    autopopulate: true
  },
  name:String,
  description: String,
  price: Number
  // TODO hours, dates available etc. possibly locations
});

service.plugin(autopopulate);

module.exports = service;
