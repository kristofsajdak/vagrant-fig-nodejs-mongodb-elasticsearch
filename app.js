var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var _ = require('lodash');
var mongoose = require('mongoose');
var uuid = require('node-uuid');

var mongodb_url;
if(process.env.NODE_ENV == 'sandbox') {
    mongodb_url = 'mongodb://' + process.env.DB_PORT_27017_TCP_ADDR + ':' + process.env.DB_PORT_27017_TCP_PORT + '/test';
} else {
    mongodb_url = process.env.MONGODB_URL;
}

mongoose.connect(mongodb_url);
var Photo = mongoose.model('Photo', {
    name: String,
    id: { type: String, default: function () {
        return uuid();
    } }
});

var app = express();
app.use(bodyParser());
app.use(morgan('dev'));

app.get('/', function (req, res) {
    res.send('API server up and running !');
});

app.post('/photos', function (req, res, next) {
    var body = req.body;
    if (body.id) {
        throw new Error();//400 error
    }
    var photo = new Photo(body);

    photo.save(function (err) {
        if (err) throw err;
        var photoObj = photo.toObject();
        delete photoObj._id;
        delete photoObj.__v;
        res.send(JSON.stringify(photoObj));
    });
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.send(500, 'Something broke!');
});


app.listen(8080);



