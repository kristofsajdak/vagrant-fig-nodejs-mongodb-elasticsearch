var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var _ = require('lodash');
var mongoose = require('mongoose');

mongoose.connect('mongodb://' + process.env.DB_PORT_27017_TCP_ADDR + ':' + process.env.DB_PORT_27017_TCP_PORT +'/test');
var Photo = mongoose.model('Photo', { name: String });

var app = express();
app.use(bodyParser());
app.use(morgan('dev'));

app.get('/', function (req, res) {
    res.send('API server up and running !');
});


app.post('/photos', function (req, res, next) {
    var body = req.body;
    var photo = new Photo(body);
    photo.save(function (err) {
        if (err) throw err;
        res.send(photo);
    });
});


app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.send(500, 'Something broke!');
});


app.listen(process.env.PORT);



