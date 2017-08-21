var express = require('express');
var router = express.Router();

var eventsinfo = require('../models/events.js');
var usersinfo = require('../models/users.js');

var eventsinfo=[
  {title: "August Chevy Party",
  ownerEmail: "name2@name.com",
  date:[08,21,2017],
  time:[17,30],
  imagelink: "",
  description: "Come bring your Chevys and drink",
  requiredCost: 0,
  country: "USA",
  state: "California",
  city: "los Angeles",
  zip: 90042,
  address: "Nova",
  interestTags:[],
  attendeeEmails: [name2@name.com, name@name.com],
  vettingQuestions:{[]}

];

var userinfo=[
  {email: "name@name.com",
  name: "Papi",
  age: 37,
  phone: 0,
  country: "USA",
  state: "California",
  city: "los Angeles",
  zip: 90042,
  imagelink: "https://dxsdcl7y7vn9x.cloudfront.net/464152/7FA82EBF-D8D7-433B-A175-CB6F55D10AEA_1.jpg",
  interests: ["Adult Swim","dragons"],
  eventsAttending: [],
  eventsOrganing: []},

  {email: "name2@name.com",
  name: "Mami",
  age: 37,
  phone: 0,
  country: "USA",
  state: "California",
  city: "los Angeles",
  zip: 90007,
  imagelink: "http://images1.americanlisted.com/nlarge/1972-chevrolet-nova-americanlisted_66331191.jpg",
  interests: ["Adult Swim","astronomy"],
  eventsAttending: [],
  eventsOrganing: []},

];

router.get('/', ( req, res) => {
	Carsinfo.create(eventssinfo, function(err) {
		if (err) {
			console.log(err);
			res.send('Error seeding database');
		} else {
			console.log('SEED EXECUTED');
			// res.redirect('/someRoute');
		}
	});
});

router.get( '/dropdatabase' , (req , res ) => {
 plannercrud.collection.drop(); //put users collection name in middle
 plannercrud.collection.drop(); //put events collection name in middle
 res.send ('You did it! You dropped the database!');
});

module.exports = router;
