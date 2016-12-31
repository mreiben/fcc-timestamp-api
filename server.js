var express = require('express');
var app = express();
var moment = require('moment');

// app.get('/', function(req, res){
//     res.send("Hello, world!");
// });

app.get('/', function(req, res){
    res.send("Enter a unix timestamp or human date in the URL to see a conversion!");
});

app.get('/:date', function(req, res){
    //create response object
    var obj = {
        unix: "null",
        natural: "null"
    }
    
    //get date as string
    var d = req.params.date;
    if(moment.unix(parseInt(d)*1000).isValid()){
        obj.unix = parseInt(d);
        obj.natural = new moment(parseInt(d)*1000).format("MMMM Do, YYYY");
    } else if (moment(d).isValid()){
        obj.unix = moment(d).unix();
        obj.natural = moment(d).format("MMMM Do, YYYY");
    }
    
    //render response object
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(obj));
});



var server_port = process.env.YOUR_PORT || process.env.PORT || 8080;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
app.listen(server_port, function() {
    console.log('Listening on port %d', server_port);
});