const express = require('express');
const router = express.Router();
const Events = require('../models/events.js');

router.get('/', (req, res)=>{
  Events.find({}, (err, foundEvents)=>{
    res.json(foundEvents);
  });
});

router.post('/', (req, res)=>{
    console.log(req.body);
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
  console.log(req.body);
  Events.findById(req.params.id, req.body, {new:true}, (err, updatedEvent)=>{
    if(updatedEvent.ownerEmail === req.session.user)
    updatedEvent.interestTags.push(req.body.interestTags);
    Events.findByIdAndUpdate(req.params.id, updatedEvent, (err, updated)=>{
      res.json(updatedEvent);
    });
  });
});

module.exports = router;
