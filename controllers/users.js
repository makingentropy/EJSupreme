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

module.exports = router;
