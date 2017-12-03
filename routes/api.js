const express = require ('express');
const router = express.Router();
const Ninja = require('../models/ninja');





// get a list of ninjas from the db
router.get('/ninjas', function(req, res, next){
    res.send({type: 'GET'});
});






// add a new ninja to the db
router.post('/ninjas', function(req, res, next){
  // var ninja = new Ninja(req.body);  // here we are creating a new instance of the Ninja model, and we are also filling in its attributes with the data they are sending to us in the requset body
  // ninja.save();  //mongoose method that will save the ninja in the ninjas collection.

  // you can do the 2 lines above with this 1 line
  // Ninja.create(req.body); 
  // remember what this does, is it returns us a Promise. Basically it means that this line might take some time to complete. So what we need to do is wait for this action to be completed and then send our response. Basically before sending our response we want to make sure this happened correctly. Since this is a Promise, we chain it with "then" method/callback/function which will only fire if the ninja was created correctly aka Ninja.create(req.body) has been completed.

  Ninja.create(req.body).then(function(data_saved_in_db_in_this_case_ninja){
    res.send(data_saved_in_db_in_this_case_ninja); // this will send the json saved back to the user, basically as an acknowledgement so that it knows everything has been successful.
  }).catch(next); // next is a function (more like an error handling middleware (next piece of middleware in our middleware stack) which gets fired if Ninja.create fails aka there is an error) defined in the main file app.js. You can also do this with a callback function like this: .catch(function(params) { // do something })
});





// update a ninja in the db
router.put('/ninjas/:id', function(req, res, next){
  // Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(pre_updated_ninja){
  //   res.send(pre_updated_ninja); // this sends back the pre updated ninja, we don't want to send this back
  // });

  // findByIdandUpdate is a mongoose function, that only updates the params passed in req.body and does NOT nullify all other attributes of the record that were not passed in req.body unlike the traditional mongo update function
  // Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
  //   Ninja.findOne({_id: req.params.id}).then(function(updated_ninja){ // this is making an extra db query that we don't need to make, see how we do below by passing a third parameter - an object {new: true} to the mongoose function
  //     res.send(updated_ninja);
  //   });
  // });

   Ninja.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}).then(function(updated_ninja){
    res.send(updated_ninja);
  }).catch(next);
});





// delete a ninja from the db
router.delete('/ninjas/:id', function(req, res, next){
    // findByIdAndRemove is a mongoose method
    Ninja.findByIdAndRemove({_id: req.params.id}).then(function(pre_deleted_ninja){
        res.send(pre_deleted_ninja);
    }).catch(next);
});



module.exports = router; // need to export so that you can use it