//Declarations and requires
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const port = process.env.PORT || 3000;

//Middleware
app.use(bodyParser.json()); //creates a property on request called req.body
app.use(express.static('public'));

//Controllers
const seedController= require('./controllers/seedController.js');
app.use('/seed', seedController);
const eventsController = require('./controllers/events.js');
// const usersController = require('./controllers/users.js');
app.use('/events', eventsController);
// app.use('/users', usersController);

//Mongoose connection
mongoose.connect('mongodb://localhost:27017/plannercrud');
mongoose.connection.once('open', ()=>{
    console.log('connected to mongo');
});

//listening
app.listen(port, ()=>{
    console.log('listening');
});
