var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var mongodb_url;
mongodb_url = process.env.MONGODB_URL + '/test';

mongoose.connect(mongodb_url);

var node_env = process.env.NODE_ENV;

var app = express();

var domainMiddleware = require('express-domain-middleware');
app.use(domainMiddleware);

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(morgan('dev'));

if (node_env === 'sandbox') {
    app.use(express.static(__dirname + '/public/logs'));
}

app.get('/', function (req, res) {

    console.log('domain.id' + process.domain.id);

    setTimeout(function () {
        console.log('domain.id' + process.domain.id);
        throw new Error('you went to /domainerror, silly!');
    }, 100);
    //res.send('API server up and running !!!!');

});

require("./dealer")(app, mongoose);

var mixinRequest = function (error, request) {
    if (request.url)
        error.url = request.url;
    if (request.component)
        error.component = request.component;
    if (request.method)
        error.action = request.method;
    if (request.params && request.params.length > 0)
        error.params = request.params;
    if (request.session)
        error.session = request.session;

    if(!error.stack)
        error.stack = '';
};

var logError = require("./logError");

app.use(function (err, req, res, next) {
    mixinRequest(err, req);
    logError(err);
    res.send(500, 'Something broke!');
});

app.listen(process.env.PORT);



