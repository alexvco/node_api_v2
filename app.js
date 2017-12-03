const express = require('express'); //npm install express --save
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const api_routes = require('./routes/api');

// set up express app
const app = express();

// connect to mongodb database
mongoose.connect('mongodb://localhost/node_api_v2_development'); // although this db does not exist yet(aka i havent created manually), when mongoose tries to connect, it will see that this db does not exist and hence will create it for us.
mongoose.Promise = global.Promise; // we are overwriting mongoose's Promise, with nodejs's global Promise because mongoose's Promise is deprecated.







// request handling and parsing middleware
app.use(bodyParser.json()); // make sure this is always before your routes, so you have access to the request object (i.e., req.body), once it hits your routes. This is a middleware that gets hit before your routes.



// routes middleware
app.use('/api/v2', api_routes);



// error handling middleware (unlike a package like the bodyParser, we will use our own function for this middleware)
// this middleware take 4 params: the next param is in case we need to call the next piece of middleware after this.
app.use(function(err, req, res, next){
  console.log(err);
  res.status(422).send({error: err.message});
});










app.get('/', function(req, res){
  res.send('hello world');
});


// listen for requests
app.listen(process.env.port || 4000, function(){
    console.log('now listening for requests');
});
