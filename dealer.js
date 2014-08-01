
var _s = require('underscore.string');
var _ = require('lodash');
var uuid = require('node-uuid');

module.exports = function(app, mongoose) {

    var dealerSchema = new mongoose.Schema({
        _id: { type: String, default: function () {
            return uuid.v4();
        }},
        code: {type: String},
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
            current_contracts: {type: [String], default: function () {
                return [];
            }},
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

    var Dealer = mongoose.model('Dealer', dealerSchema);

    app.post('/dealers', function (req, res, next) {
        var dealer = new Dealer(req.body);
        dealer.save(function (err) {
            if (err) return next(err);
        });
        res.send(dealer.toJSON());
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
};



