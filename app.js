var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var mongodb_url;
if(process.env.NODE_ENV == 'sandbox') {
    mongodb_url = 'mongodb://' + process.env.DB_PORT_27017_TCP_ADDR + ':' + process.env.DB_PORT_27017_TCP_PORT + '/test';
} else {
    mongodb_url = process.env.MONGODB_URL;
}

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



