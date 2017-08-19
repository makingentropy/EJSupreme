const mongoose = require('mongoose');

const eventsSchema = mongoose.Schema({
  title: String,
  ownerEmail: String,
  date:Array, // [mm,dd,yyyy]
  time:Array, //[hh,mm]
  imagelink: String,
  description: String,
  requiredCost: Number,
  country: String,
  state: String,
  city: String,
  zip: Number,
  address: String,
  interestTags:Array,
  attendeeEmails: Array,
  vettingQuestions:Object
});

const Events = mongoose.model('Event', eventsSchema);

module.exports = Events;
