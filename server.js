const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const moment = require('moment');

app.use(bodyParser.json()); //creates a property on request called req.body
app.use(express.static('public'));
app.use(session({ //creates a property on request called req.session
	  secret: "this is a random string secret", //a random string do not copy this value or your stuff will get hacked
	  resave: false,
	  saveUninitialized: false

}));


mongoose.connect('mongodb://localhost:27017/plannercrud');
mongoose.connection.once('open', ()=>{
    console.log('connected to mongo');
});

app.listen(3000, ()=>{
    console.log('listening');
});
