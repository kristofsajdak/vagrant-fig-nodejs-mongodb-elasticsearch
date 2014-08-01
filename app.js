var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
require('longjohn');
var woodman = require('woodman');

var mongodb_url;
mongodb_url = process.env.MONGODB_URL + '/test';

mongoose.connect(mongodb_url);

var node_env = process.env.NODE_ENV;

var app = express();

var domainMiddleware = require('express-domain-middleware');
app.use(domainMiddleware);

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

if (node_env === 'sandbox') {
    app.use('/logs', express.static(__dirname + '/public/logs'));
}

woodman.load('console %domain - %message');
var logger = woodman.getLogger('dealer-api');

morgan.token('domain', function (req, res) {
    return process.domain.id;
});
app.use(morgan({ immediate: true, format: ':domain - :method :url' }));

app.get('/', function (req, res) {

    logger.info('hello there');

    setTimeout(function () {
        throw new Error('dummy error !');
    }, 100);
    //res.send('API server up and running !!!!');

});

require("./dealer")(app, mongoose);

app.use(function (err, req, res, next) {

    var message = err.stack;
    logger.error(message);
    if (node_env === "sandbox") {
        res.send(500, message);
    } else {
        res.send(500, "An unexpected error occurred !");
    }

});

app.listen(process.env.PORT);



