var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var _s = require('underscore.string');
var _ = require('lodash');

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


var dealerSchema = new mongoose.Schema({
    id: {type: String, required: true},
    code: {type: String, required: true},
    name: {type: String, required: true},
    address: {
        address1: String,
        address2: String,
        city: String,
        zip: String,
        coordinates: [Number]
    },
    phone_main: {
        area: String,
        number: String
    },
    links: {
        parent: String,
        bill_to: String,
        ship_to: String,
        current_contracts: [String],
        "address.country": String,
        "address.state_province": String,
        phone_numbers: String,
        business_hours: String,
        dealer_misc: String,
        current_lines_of_business: [String],
        service_level: String,
        current_offerings: [String]
    }
});

dealerSchema.pre('save', function (next) {
    this.id = "123456";
    next();
});

var Dealer = mongoose.model('Dealer', dealerSchema);

app.post('/dealers', function (req, res, next) {
    var dealer = new Dealer(req.body);
    dealer.save(function (err) {
        if (err) return next(err);
    });
    res.send(dealer);
});

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



