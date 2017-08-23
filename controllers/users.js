const express = require('express');
const router = express.Router();
const Users = require('../models/users.js');
const bcrypt = require('bcryptjs');

router.get('/', (req, res)=>{
  Users.find({}, (err, foundUsers)=>{
    res.json(foundUsers);
  });
});

router.post('/register', (req, res, next)=>{
//check if user already exists
  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const userDbEntry = {};

  userDbEntry.email = req.body.email;
  userDbEntry.password = passwordHash;
  Users.create(userDbEntry, (err, user) => {
    console.log(user);
    req.session.email = user.email;
    req.session.logged = true;
    res.json(req.session.logged);
  });
});

router.post('/login', (req, res)=>{
  Users.findOne({email: req.body.email}, (err, user)=>{
    if(user){
      if(bcrypt.compareSync(req.body.password, user.password)){
        req.session.email = req.body.email;
        req.session.logged = true;
        res.json(req.session.logged);
      } else {
        req.session.message = 'Username or password are incorrect';
        res.json(req.session.message);
      }
    } else {
      req.session.message = 'Username or password are incorrect';
      res.json(req.session.message);
    };
  });
});

router.delete('/:id', (req, res)=>{
  Users.findByIdAndRemove(req.params.id, (err, deletedUser)=>{
    res.json(deletedUser);
  });
});


router.put('/:id', (req, res)=>{
  Users.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedUser)=>{
    res.json(updatedUser);
  });
});

router.get('/logout', (req, res)=>{
  req.session.destroy(function(err){
    req.session = false;
    console.log('Logged out');
    res.json(req.session)
  });
});

module.exports = router;
