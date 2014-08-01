var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var mongodb_url;
mongodb_url = process.env.MONGODB_URL + '/test';

mongoose.connect(mongodb_url);

var node_env = process.env.NODE_ENV;

var app = express();

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(morgan('dev'));

if (node_env === 'sandbox') {
    app.use(express.static(__dirname + '/logs'));
}

app.get('/', function (req, res) {
    res.send('API server up and running !!!!');
});

require("./dealer")(app, mongoose)

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.send(500, 'Something broke!');
});


app.listen(process.env.PORT);



