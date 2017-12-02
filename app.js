const express = require('express'); //npm install express --save
const bodyParser = require('body-parser');
const api_routes = require('./routes/api');

// set up express app
const app = express();

app.use(bodyParser.json()); // make sure this is always before your routes, so you have access to the request object (i.e., req.body), once it hits your routes
app.use('/api/v2', api_routes);


// listen for requests
app.listen(process.env.port || 4000, function(){
    console.log('now listening for requests');
});

app.get('/', function(req, res){
  res.send('hello world');
});