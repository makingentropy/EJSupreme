const express = require('express');
const router = express.Router();
const Users = require('../models/users.js');
const bcrypt = require('bcryptjs');

//ADMIN MODERATOR: See all registered users
router.get('/', (req, res)=>{
  Users.find({}, (err, foundUsers)=>{
    res.json(foundUsers);
  });
});

//USER: Register an account
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

//ADMIN MODERATOR: Log into a pre-existing account
//USER: Log into a pre-existing account
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

//ADMIN MODERATOR: Delete an account
//USER: Delete your own account
router.delete('/:id', (req, res)=>{
  Users.findByIdAndRemove(req.params.id, (err, deletedUser)=>{
    res.json(deletedUser);
  });
});

//ADMIN MODERATOR: Update an account
//USER: Update your own account
router.put('/:id', (req, res)=>{
  Users.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedUser)=>{
    res.json(updatedUser);
  });
});

//ADMIN MODERATOR: Log out of your account
//USER: Log out of your account
router.get('/logout', (req, res)=>{
  req.session.destroy(function(err){
    req.session = false;
    console.log('Logged out');
    res.json(req.session)
  });
});

//ADMIN MODERATOR: View a profile
//USER: View a profile
router.get('/:id', (req, res)=>{
  Users.find({_id: req.params.id}, function(err, foundUser){
    res.json(foundUser)
  });
});

module.exports = router;
