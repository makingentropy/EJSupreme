const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());


const seedController= require('./controllers/seedController.js');
app.use('/seed', seedController);
app.use(express.static('public'));



mongoose.connect('mongodb://localhost:27017/plannercrud');
mongoose.connection.once('open', ()=>{
    console.log('connected to mongo');
});

app.listen(3000, ()=>{
    console.log('listening');
});
