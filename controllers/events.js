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
  Events.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedEvent)=>{
    res.json(updatedEvent);
  });
});

module.exports = router;
