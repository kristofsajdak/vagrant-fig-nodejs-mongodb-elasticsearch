var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var _ = require('lodash');
var mongoose = require('mongoose');
var uuid = require('node-uuid');
var swagger = require("swagger-node-express");

mongoose.connect('mongodb://' + process.env.DB_PORT_27017_TCP_ADDR + ':' + process.env.DB_PORT_27017_TCP_PORT + '/test');
var Photo = mongoose.model('Photo', {
    name: String,
    id: { type: String, default: function () {
        return uuid();
    } }
});

var app = express();
app.use(bodyParser());
app.use(morgan('dev'));

swagger.setAppHandler(app);

app.get('/', function (req, res) {
    res.send('API server up and running !');
});

var models = {
    "Photo": {
        "id": "Photo",
        "required": ["name"],
        "properties": {
            "id": {
                "type": "string",
                "description": "Id of the photo - uuid format"
            },
            "name": {
                "type": "string",
                "description": "Name of the photo"
            }
        }
    }
};

var createPhoto = {
    'spec': {
        "description" : "Operations about pets",
        "path" : "/photos",
        "notes" : "Creates a photo",
        "summary" : "Create a photo",
        "method": "POST",
        "type" : "Photo",
        "errorResponses" : [swagger.errors.invalid('id')],
        "nickname" : "createPhoto"
    },
    'action': function (req, res, next) {
        var body = req.body;
        if (body.id) {
            throw swagger.errors.invalid('id');
        }
        var photo = new Photo(body);

        photo.save(function (err) {
            if (err) throw err;
            var photoObj = photo.toObject();
            delete photoObj._id;
            delete photoObj.__v;
            res.send(JSON.stringify(photoObj));
        });
    }
};

swagger.addModels(models)
    .addPost(createPhoto);

// Configures the app's base path and api version.
swagger.configureSwaggerPaths("", "api-docs", "")
swagger.configure("http://localhost:8002", "1.0.0");

// Serve up swagger ui at /docs via static route
var docs_handler = express.static(__dirname + '/swagger-ui/');
app.get(/^\/docs(\/.*)?$/, function(req, res, next) {
    if (req.url === '/docs') { // express static barfs on root url w/o trailing slash
        res.writeHead(302, { 'Location' : req.url + '/' });
        res.end();
        return;
    }
    // take off leading /docs so that connect locates file correctly
    req.url = req.url.substr('/docs'.length);
    return docs_handler(req, res, next);
});

app.use(function(err, req, res, next){
    res.send(err.status, err.message);
});

app.listen(8080);



