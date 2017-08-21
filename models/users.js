const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
  email: String,
  name: String,
  age: Number,
  phone: Number,
  country: String,
  state: String,
  city: String,
  zip: Number,
  imagelink: String,
  interests: Array,
  eventsAttending: Array,
  eventsOrganing: Array
});

const Users = mongoose.model('User', usersSchema);

module.exports = Users;
