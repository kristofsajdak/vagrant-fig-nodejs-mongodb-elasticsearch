var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var mongodb_url;
mongodb_url = process.env.MONGODB_URL + '/test';

mongoose.connect(mongodb_url);

var app = express();
app.use(bodyParser());
app.use(morgan('dev'));

app.get('/', function (req, res) {
    res.send('API server up and running !');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.send(500, 'Something broke!');
});


app.listen(process.env.PORT);



