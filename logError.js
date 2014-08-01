//require('longjohn');
var prettyjson = require('prettyjson');

var formatJson = function (object) {
    var json = prettyjson.render(object);
    json = json.split('\n').join('\n    ');
    return '    ' + json;
};

var playNiceError = function (error) {
    // remove longjohn properties that break prettyjson
    delete error.__cached_trace__;
    delete error.__previous__;

    // remove domain property we probably don't care about
    delete error.domain;
};

var serializeError = function (error) {
    playNiceError(error);

    var metadata = formatJson(error);
    var stack = error.stack.trim();
    var message = '' + stack + '\n';
    if (metadata.trim() !== '')
        message += '  Metadata:\n' + metadata;
    return message;
};

module.exports = function (error) {
    console.error(serializeError(error));
};