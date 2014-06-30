var express = require('express');

var app = express();

app.get('/', function(req, res){
    res.send('API server up and running !');
});

app.listen(process.env.PORT);