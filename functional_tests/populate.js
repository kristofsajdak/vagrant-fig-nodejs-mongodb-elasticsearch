var Promise = require('bluebird'),
    request = require('request');
var _s = require('underscore.string');
var _ = require('lodash');

var countries = {};
/*
 function rp(c) {

 c.headers = c.headers || {};
 if (!c.headers['accept']) c.headers['accept'] = 'application/vnd.api+json';
 if (!c.headers['content-type']) c.headers['content-type'] = 'application/vnd.api+json';

 return new Promise(function (resolve, reject) {
 request(c, function (error, response, body) {
 if (error) {
 reject(error);
 } else {
 if (response.statusCode !== 200 && response.statusCode !== 201) {
 reject(response);
 } else {
 resolve(response, body);
 }
 }
 });
 });
 }*/

var uri = 'http://192.168.50.4:8080';

var request = Promise.promisify(require('request'));

var headers = {'content-type': 'application/vnd.api+json'};

var body_serialized = JSON.stringify({
    "regions": [
        {
            "code": "NA",
            "description": "North America"
        }
    ]
});

request({uri: uri + '/regions', headers: headers, method: 'POST', body: body_serialized})
    .spread(function (response, body) {
        console.log('bla' + response.body);
    })
    .then(function () {
        var body_serialized = JSON.stringify({
            "regions": [
                {
                    "code": "EU",
                    "description": "Europe"
                }
            ]
        });
        return request({uri: uri + '/regions', headers: headers, method: 'POST', body: body_serialized});
    })
    .spread(function (response, body) {
        console.log('ha' + response.body);
    });

/*var do_request = function (path, method, body, handle_response) {
 var serialized_body = body ? JSON.stringify(body) : '';
 return rp({uri: uri + path, method: method, body: serialized_body}).map(function (response) {
 return handle_response(response)
 });
 };

 do_request('/countries', 'GET', {
 "regions": [
 {
 "code": "NA",
 "description": "North America"
 }
 ]
 }, function (response) {
 console.log(response);
 return 'bla';
 })
 .then(function(result){console.log(result)});*/

/*



 Promise.resolve()
 .then(rp({uri: 'http://192.168.50.4:8080/regions', method: 'POST', body: JSON.stringify({
 "regions": [
 {
 "id": "1",
 "code": "NA",
 "description": "North America"
 }
 ]
 })}).then(function (response) {
 console.log(response.body)
 }))
 .then(rp({uri: 'http://192.168.50.4:8080/regions', method: 'POST',  body: JSON.stringify({
 "regions": [
 {
 "id": "1",
 "code": "EU",
 "description": "Europe"
 }
 ]
 })}).then(function (response) {
 console.log(response.body)
 }))
 .then(rp({uri: 'http://192.168.50.4:8080/regions', method: 'GET'}).then(function (response) {
 console.log(response.body)
 }))
 .catch(function(error) {
 console.log('catched ' +error);
 });
 */

/*Promise.resolve()
 .then(function () {
 return rp({uri: 'http://192.168.50.4:8080/dealers', method: 'GET'});
 })
 .then(function (result) {
 console.log('result =' + JSON.stringify(result));
 })
 .catch(function (error) {
 console.log('catched' + JSON.stringify(error));
 })
 .done();*/
