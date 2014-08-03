var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
require('longjohn');
var woodman = require('woodman');

var mongodb_url = process.env.MONGOHQ_URL;
var node_env = process.env.NODE_ENV;

mongoose.connect(mongodb_url);

var fortune = require('fortune');
var options = {
    adapter: 'mongodb',
    connectionString: mongodb_url
};
var fortune_app = fortune(options);
var app = fortune_app.router;

var domainMiddleware = require('express-domain-middleware');
app.use(domainMiddleware);

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

if (node_env === 'sandbox') {
    var serveIndex = require('serve-index');
    var localPath = __dirname + '/public/logs';
    app.use('/logs', serveIndex(localPath));
    app.use('/logs', express.static(localPath));

}

woodman.load('console %domain - %message');
var logger = woodman.getLogger('app');

morgan.token('domain', function (req, res) {
    return process.domain.id;
});
app.use(morgan({ immediate: true, format: ':domain - :method :url' }));

require("./resources")(fortune_app, mongoose);

app.use(function (err, req, res, next) {

    var message = err.stack;
    logger.error(message);
    if (node_env === "sandbox") {
        res.send(500, message);
    } else {
        res.send(500, "An unexpected error occurred !");
    }

});

fortune_app.listen(process.env.PORT);



