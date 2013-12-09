var http = require('http');
var https = require('https');

/*---------------
 Apply validation rules to a HTTP request to determine if it is valid.
 Valid status code, expected text.
-----------------*/
function validateHttpResponse(entity, body, res) {
  if (entity.expected) {
    if (res.statusCode != entity.expected.statuscode) {
      return 'FAILED! expected status code :' + entity.expected.statuscode +
        ' at ' + entity.url + ' but got ' + res.statusCode;
    }
    else if (entity.expected.contains &&
             (!body || (body.indexOf(entity.expected.contains) === -1))) {
      return 'FAILED! expected text "' + entity.expected.contains +
        '" but it wasn\'t found';
    }
    else {
      return ''; //ok
    }
  }
  return ''; //nothing to check for
}


function ping(entity, callback) {
  var startTime = new Date();

  var headers = {
    'Host': entity.host.host
  };

  if (entity.method == 'post') {
    headers['Content-Type'] = entity.content_type;
    headers['Content-Length'] = JSON.stringify(entity.input_data || '').length;
  }

  var method = entity.method;
  if (!entity.expected || !entity.expected.contains) {
    method = "HEAD";
  }

  var options = {
    port: entity.host.port,
    host: entity.host.host,
    path: entity.url,
    method: method,
    agent:false
  };

  var request;
  if (entity.host.protocol === "https") {
    request = https.request(options);
    https.globalAgent.maxSockets=500;
  }
  else {
    request = http.request(options);
    http.globalAgent.maxSockets=500;
  }

  var handledCallback = false;
  var error = null;

  request.setTimeout(entity.timeout || 10000, function() {
    if (!handledCallback){
      handledCallback = true;
      callback('Timeout');
    }
  });

  request.addListener('error', function(connectionException) {
    error = connectionException.errno || 'Error establishing connection';
    if (!handledCallback) {
      handledCallback = true;
      callback(error);
    }
  });

  request.on('response', function(response) {
    response.setEncoding('utf-8');
    var body = '';

    response.on('data', function(chunk) {
      body += chunk;
    });

    response.on('end', function() {
      var timeDiff = (new Date() - startTime);
      if (!handledCallback){
        handledCallback = true;
        callback(validateHTTPRsponse(entity, body, response), body, response, timeDiff);
      }
    });

    response.on('error', function(e) {
      error = e.message;
    });
  });

  request.on('error', function(e) {
    if (!handledCallback) {
      handledCallback = true;
      callback(e.message + '. Details :' + entity.host.host + entity.url);
    }
  });

  request.write(JSON.stringify(entity.inputData) || '');
  request.end();
}

module.exports.ping = ping;
