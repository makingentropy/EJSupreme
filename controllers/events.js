const express = require('express');
const router = express.Router();
const Events = require('../models/events.js');

router.get('/', (req, res)=>{
  console.log('get route has initiated');
  console.log('this is req.session.interests', req.session.interests);
  for(let i = 0; i <= req.session.interests.length-1; i++){
    console.log('for loop has begun');
    Events.find({'interestTags': req.session.interests[i]}).exec(function(err, foundEvents){
      console.log('finding event...');
    if(err){
      console.log(err);
      res.send(err);
    } else {
      res.json(foundEvents);
    }
  });
  } //closing for loop
});

// router.get('/', (req, res)=>{
//   Events.find({}, (err, foundEvents)=>{
//     res.json(foundEvents);
//   });
// });


router.post('/', (req, res)=>{
    // console.log("session,event.js, ln 12: ",req.session);
    Events.create(req.body, (err, createdEvent)=>{
      res.json(createdEvent);
    });
});

router.delete('/:id', (req, res)=>{
  Events.findByIdAndRemove(req.params.id, (err, deletedEvent)=>{
    res.json(deletedEvent);
  });
});

router.put('/:id', (req, res)=>{
  //Model.findById(id, [projection], [options], [callback])
  Events.findById(req.params.id,  (err, updatedEvent)=>{
    // console.log("updatedEvent,line 29, events.js: ",updatedEvent);
    console.log(updatedEvent.ownerEmail);
    console.log(req.session.email);
    if(updatedEvent.ownerEmail === req.session.email){
      //NOTE: in gold release, two undefineds being compared here would
      //allow access so this needs to be changed in that release
      updatedEvent.interestTags.push(req.body.interestTags);
      Events.findByIdAndUpdate(req.params.id, updatedEvent, (err, updated)=>{
        res.json(updatedEvent);
      });
    }else{
      console.log("err: ",err);
    }
  });
});

module.exports = router;
