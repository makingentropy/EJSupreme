//Declarations and requires
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const moment = require('moment');
const port = process.env.PORT || 3000;

//Middleware
app.use(bodyParser.json()); //creates a property on request called req.body
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(session({
  secret: "this is a random string secret", //a random string do not copy this value or your stuff will get hacked
  resave: false,
  saveUninitialized: false
}));

//Controllers
const seedController= require('./controllers/seedController.js');
app.use('/seed', seedController);
const eventsController = require('./controllers/events.js');
app.use('/events', eventsController);
const usersController = require('./controllers/users.js');
app.use('/users', usersController);

//Mongoose connection
var mongoUri=process.env.MONGODB_URI || 'mongodb://localhost:27017/plannercrud';
mongoose.connect(mongoUri);
mongoose.connection.once('open', ()=>{
  console.log('connected to mongo');
});

//listening
app.listen(port, ()=>{
  console.log('listening on port '+port);
});
