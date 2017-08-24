const mongoose = require('mongoose');
const Event = require('./events.js');

const usersSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: String,
  age: Number,
  phone: Number,
  country: String,
  state: String,
  city: String,
  zip: Number,
  imagelink: String,
  interests: [String],
  eventsAttending: Array,
  eventsOrganizing: Array,
});

const Users = mongoose.model('User', usersSchema);

module.exports = Users;
