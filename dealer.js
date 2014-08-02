var _s = require('underscore.string');
var _ = require('lodash');
var uuid = require('node-uuid');

module.exports = function (app, mongoose) {

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
            "address.country": String
        }
    });

    var Dealer = mongoose.model('Dealer', dealerSchema);

    var transformDoc = function (doc, ret, options) {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
    };

    var mapDocs = function (docs) {
        return _.map(docs, function (doc) {
            return doc.toObject({transform: doc});
        });
    };

    app.post('/dealers', function (req, res, next) {
        var dealer = new Dealer(req.body);
        dealer.save(function (err) {
            if (err) return next(err);
        });
        var dealerObj = dealer.toObject({transform: transformDoc});
        res.send(JSON.stringify(dealerObj));
    });

    app.get('/dealers', function (req, res) {
        Dealer.find({}, function (err, docs) {
            if (err) return next(err);
            var data = mapDocs(docs);
            res.send(data);
        });
        /* var facetProps = _.filter(Object.keys(req.query), function (propName) {
         return (_s.startsWith(propName, 'facet.field'));
         });
         var facets = _.map(facetProps,function (facetProp) {
         return facetProp + '=' + req.query[facetProp];
         }).join(',');

         res.send('request came in with following facets : ' + facets);*/

    });
};



