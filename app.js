var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var _s = require('underscore.string');
var _ = require('lodash');

var mongodb_url;
mongodb_url = process.env.MONGODB_URL + '/test';

mongoose.connect(mongodb_url);

var app = express();
app.use(bodyParser());
app.use(morgan('dev'));

app.get('/', function (req, res) {
    res.send('API server up and running !!!!');
});

app.get('/dealers', function (req, res) {
    var facetProps = _.filter(Object.keys(req.query), function (propName) {
        return (_s.startsWith(propName, 'facet.field'));
    });
    var facets = _.map(facetProps,function (facetProp) {
        return facetProp + '=' + req.query[facetProp];
    }).join(',');

    res.send('request came in with following facets : ' + facets);

});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.send(500, 'Something broke!');
});


app.listen(process.env.PORT);



