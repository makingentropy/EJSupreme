const express = require('express');
const router = express.Router();
const Events = require('../models/events.js');

router.get('/', (req, res)=>{
  Events.find({}, (err, foundEvents)=>{
    res.json(foundEvents);
  });
});

router.post('/', (req, res)=>{
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
<<<<<<< HEAD
  Events.findById(req.params.id,  (err, updatedEvent)=>{
    if(updatedEvent.ownerEmail === req.session.email){
=======
  // console.log("req.session,line 25, events.js: ",req.session);

  //Model.findById(id, [projection], [options], [callback])
  Events.findById(req.params.id,  (err, updatedEvent)=>{
    // console.log("updatedEvent,line 29, events.js: ",updatedEvent);
    console.log("updatedEvent.ownerEmail : ", updatedEvent.ownerEmail);
    console.log("req.session.email : ",req.session.email);
    if(updatedEvent.ownerEmail === req.session.email){
      //NOTE: in gold release, two undefineds being compared here would
      //allow access so this needs to be changed in that release
>>>>>>> 8bdb2018464632c7411b38b029cd64d2ae81ec41
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
