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
    var id = JSON.parse(results[0].body)[resource][0].id;
    var code = JSON.parse(results[0].body)[resource][0].code;
    map[code] = id;
}

var uri = 'http://192.168.50.4:8080';


var regions = {};
var insertRegions = function () {

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
var insertCountries = function () {

    var us = do_request('/countries', 'POST', {
        "countries": [
            {
                "code": "US",
                "description": "United States",
                "links" : {
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
                "links" : {
                    "region": regions["NA"]
                }
            }
        ]
    });

    return Promise.all([ us, ca]).map(function (results) {
        map_code_with_id(results, countries, 'countries');
    })
};

function print() {
    console.log(JSON.stringify(countries));
    console.log(JSON.stringify(regions));
}

Promise.resolve()
    .then(function () {
        return insertRegions();
    })
    .then(function () {
        return insertCountries();
    })
    .then(function () {
        print();
    });




