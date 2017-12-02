const express = require('express');
const api_routes = require('./routes/api');

// set up express app
const app = express();

app.use('/api/v2', api_routes)


// listen for requests
app.listen(process.env.port || 4000, function(){
    console.log('now listening for requests');
});

app.get('/', function(req, res){
  res.send('hello world');
})