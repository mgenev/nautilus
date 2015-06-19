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
  terms: String,
  priceAdult: Number,
  priceChild: Number,
  deposit: Number, // percentage stored as decimal
  category: { type: String, enum: ['activity', 'lodging', 'food', 'education'] },
  minCapacity: Number,
  maxCapacity: Number
  // TODO hours, dates available etc. possibly locations
});

service.plugin(autopopulate);

module.exports = service;
