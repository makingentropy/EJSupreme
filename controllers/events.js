const express = require('express');
const router = express.Router();
const Events = require('../models/events.js');

router.get('/', (req, res)=>{
  // Events.find({}, (err, foundEvents)=>{
  //   console.log("req.session: ",req.session);
  //   res.json(foundEvents);
  // });
  console.log("hey hey hey");
});
// router.get('/', (req, res)=>{
//   let allMatchingEvents=[];
//   console.log("B4 if, req.session.logged: ",req.session.logged);
//   console.log("req.session: ",req.session);
//   if(req.session.logged){
//     console.log("req.session.logged: ",req.session.logged);
//     Events.find({}, (err, foundEvents)=>{ //puills all events from db
// //   //     for(let i=0; i<=foundEvents.length-1; i++){//cycles through events
// //   //       for(let j=0; j<=req.session.interests.length-1; j++){
// //   //         for(let n=0; n<=foundEvents.interestTags.length-1; n++){
// //   //           console.log("foundEvents.length: ",foundEvents.length," "+
// //   //           "req.session.interests[j]: ",req.session.interests[j]," "+
// //   //           "foundEvents.interestTags[n]: ",foundEvents.interestTags[n]);
// //   //           if(req.session.interests[j]==foundEvents.interestTags[n]){
// //   //             allMatchingEvents.push(foundEvents[i]);
// //   //             i++; //break loop, go to next event
// //   //           }
// //   //         }
// //   //       }
// //   //     }
// //   //     // DISPLAY allMatchingEvents here
// //   //     res.json(allMatchingEvents);
// //   //   });
// //   // }else{
// //   //   console.log("Can't display events/interestTags until logged in");
//
//     res.json(foundEvents);  //testing
//   }); //testing
// }
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
