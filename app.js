var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
require('longjohn');
var woodman = require('woodman');

var mongodb_url = process.env.MONGODB_URL;
var es_url = process.env.ES_URL;
var node_env = process.env.NODE_ENV;

mongoose.connect(mongodb_url);

var options = {
    adapter: 'mongodb',
    connectionString: mongodb_url
};

var app = express();

var domainMiddleware = require('express-domain-middleware');
app.use(domainMiddleware);

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

if (node_env === 'sandbox') {
    var serveIndex = require('serve-index');
    var localPath = __dirname + '/provision/logs';
    app.use('/logs', serveIndex(localPath));
    app.use('/logs', express.static(localPath));

}

woodman.load('console %domain - %message');
var logger = woodman.getLogger('app');

morgan.token('domain', function (req, res) {
    return process.domain.id;
});
app.use(morgan({ immediate: true, format: ':domain - :method :url' }));

app.get('/', function(req, res){
    res.send('hello world !');
});

app.use(function (err, req, res, next) {

    var message = err.stack;
    logger.error(message);
    if (node_env === "sandbox") {
        res.send(500, message);
    } else {
        res.send(500, "An unexpected error occurred !");
    }

});

var port = Number(process.env.PORT);
var server = app.listen(port, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port)

});



