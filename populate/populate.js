var Promise = require('bluebird'),
    request = require('request');
var _s = require('underscore.string');
var _ = require('lodash');


var request = Promise.promisify(require('request'));
var headers = {'content-type': 'application/vnd.api+json'};

var do_request = function (path, method, body) {
    return Promise.resolve()
        .then(function () {
            var body_serialized = JSON.stringify(body);
            return request({uri: uri + path, headers: headers, method: method, body: body_serialized})
        });
};

function map_code_with_id(results, map, resource) {
    //console.log(results);
    var id = JSON.parse(results[0].body)[resource][0].id;
    var code = JSON.parse(results[0].body)[resource][0].code;
    map[code] = id;
}

var uri = process.argv[2];


var regions = {};
var insert_regions = function () {

    var eu = do_request('/regions', 'POST', {
        "regions": [
            {
                "code": "EU",
                "description": "Europe"
            }
        ]
    });

    var na = do_request('/regions', 'POST', {
        "regions": [
            {
                "code": "NA",
                "description": "North America"
            }
        ]
    });

    var sa = do_request('/regions', 'POST', {
        "regions": [
            {
                "code": "SA",
                "description": "South America"
            }
        ]
    });
    return Promise.all([ eu, na, sa]).map(function (results) {
        map_code_with_id(results, regions, 'regions');
    })
};

var countries = {};
var insert_countries = function () {

    var us = do_request('/countries', 'POST', {
        "countries": [
            {
                "code": "US",
                "description": "United States",
                "links": {
                    "region": regions["NA"]
                }
            }
        ]
    });

    var ca = do_request('/countries', 'POST', {
        "countries": [
            {
                "code": "CA",
                "description": "Canada",
                "links": {
                    "region": regions["NA"]
                }
            }
        ]
    });

    return Promise.all([ us, ca]).map(function (results) {
        map_code_with_id(results, countries, 'countries');
    })
};

var state_provinces = {};
var insert_state_provinces = function () {

    var us = do_request('/state_provinces', 'POST', {
        "state_provinces": [
            {
                "code": "US-NY",
                "description": "New York",
                "links": {
                    "country": countries["US"]
                }
            }
        ]
    });

    var ca = do_request('/state_provinces', 'POST', {
        "state_provinces": [
            {
                "code": "US-IN",
                "description": "Indiana",
                "links": {
                    "country": countries["US"]
                }
            }
        ]
    });

    return Promise.all([ us, ca]).map(function (results) {
        map_code_with_id(results, state_provinces, 'state_provinces');
    })
};

var contract_types = {};
var insert_contract_types = function () {

    var m = do_request('/contract_types', 'POST', {
        "contract_types": [
            {
                "code": "M",
                "description": "Machinery"
            }
        ]
    });

    var p = do_request('/contract_types', 'POST', {
        "contract_types": [
            {
                "code": "P",
                "description": "Parts"
            }
        ]
    });

    return Promise.all([ m, p]).map(function (results) {
        map_code_with_id(results, contract_types, 'contract_types');
    })
};


var product_types = {};
var insert_product_types = function () {

    var c = do_request('/product_types', 'POST', {
        "product_types": [
            {
                "code": "C",
                "description": "Combines"
            }
        ]
    });

    var t = do_request('/product_types', 'POST', {
        "product_types": [
            {
                "code": "T",
                "description": "Tractors"
            }
        ]
    });

    var i = do_request('/product_types', 'POST', {
        "product_types": [
            {
                "code": "I",
                "description": "Implements"
            }
        ]
    });

    return Promise.all([ c, t, i]).map(function (results) {
        map_code_with_id(results, product_types, 'product_types');
    })
};

var contracts = {};
var insert_contracts = function () {

    var chc = do_request('/contracts', 'POST', {
        "contracts": [
            {
                "code": "CHC",
                "description": "Challenger Combines",
                "links": {
                    "brand": brands["CH"],
                    "contract_type": contract_types["P"],
                    "product_type": product_types["C"]
                }
            }
        ]
    });

    var chb = do_request('/contracts', 'POST', {
        "contracts": [
            {
                "code": "CHB",
                "description": "Challenger Track Tractors",
                "links": {
                    "brand": brands["CH"],
                    "contract_type": contract_types["P"],
                    "product_type": product_types["T"]
                }
            }
        ]
    });

    var chi = do_request('/contracts', 'POST', {
        "contracts": [
            {
                "code": "CHI",
                "description": "Challenger Implements",
                "links": {
                    "brand": brands["CH"],
                    "contract_type": contract_types["P"],
                    "product_type": product_types["I"]
                }
            }
        ]
    });

    return Promise.all([ chc, chb, chi]).map(function (results) {
        map_code_with_id(results, contracts, 'contracts');
    })
};

var brands = {};
var insert_brands = function () {

    var ch = do_request('/brands', 'POST', {
        "brands": [
            {
                "code": "CH",
                "description": "Challenger"
            }
        ]
    });

    var mf = do_request('/brands', 'POST', {
        "brands": [
            {
                "code": "MF",
                "description": "Massey Ferguson"
            }
        ]
    });

    return Promise.all([ ch, mf]).map(function (results) {
        map_code_with_id(results, brands, 'brands');
    })
};

var dealers = {};
var insert_dealers = function () {

    var _320005 = do_request('/dealers', 'POST', {
        "dealers": [
            {
                "code": "320005",
                "name": "Affolder Impl Sales  Inc.",
                "address1": "6704 S. Us Hwy 27",
                "address2": "",
                "city": "Berne",
                "zip": "46711",
                "phone_area": "260",
                "phone_number": "5892964",
                "links": {
                    "current_contracts": [ contracts["CHC"], contracts["CHB"], contracts["CHI"] ],
                    "address_country": countries["CH"],
                    "address_state_province": state_provinces["US-IN"]
                }
            }
        ]
    });

    return Promise.all([ _320005]).map(function (results) {
        map_code_with_id(results, dealers, 'dealers');
    })
};

function print() {
    console.log(JSON.stringify(countries));
    console.log(JSON.stringify(regions));
    console.log(JSON.stringify(state_provinces));
    console.log(JSON.stringify(brands));
    console.log(JSON.stringify(contract_types));
    console.log(JSON.stringify(product_types));
    console.log(JSON.stringify(contracts));
    console.log(JSON.stringify(dealers));
}

Promise.resolve()
    .then(function () {
        console.log('insert_regions');
        return insert_regions();
    })
    .then(function () {
        console.log('insert_countries');
        return insert_countries();
    })
    .then(function () {
        console.log('insert_state_provinces');
        return insert_state_provinces();
    })
    .then(function () {
        console.log('insert_brands');
        return insert_brands();
    })
    .then(function () {
        console.log('insert_contract_types');
        return insert_contract_types();
    })
    .then(function () {
        console.log('insert_product_types');
        return insert_product_types();
    })
    .then(function () {
        console.log('insert_contracts');
        return insert_contracts();
    })
    .then(function () {
        console.log('insert_dealers');
        return insert_dealers();
    })
    .then(function () {
        print();
    });




