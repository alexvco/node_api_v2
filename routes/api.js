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
  }).catch(next) // next is a function (more like an error handling middleware (next piece of middleware in our middleware stack) which gets fired if Ninja.create fails aka there is an error) defined in the main file app.js. You can also do this with a callback function like this: .catch(function(params) { // do something })
});

// update a ninja in the db
router.put('/ninjas/:id', function(req, res, next){
    res.send({type: 'PUT'});
});

// delete a ninja from the db
router.delete('/ninjas/:id', function(req, res, next){
    res.send({type: 'DELETE'});
});

module.exports = router; // need to export so that you can use it