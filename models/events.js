const mongoose = require('mongoose');

const eventsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  ownerEmail: {
    type: String,
    required: true
  },
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
  interestTags: [String],
  attendeeEmails: Array,
  vettingQuestions:Array
});

const Events = mongoose.model('Event', eventsSchema);

module.exports = Events;
