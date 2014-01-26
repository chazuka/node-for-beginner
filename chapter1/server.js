/**
 * Basic HTTP Server module
 */

var http = require('http'),
  url = require('url');

var router = require('./route'),
  assets = require('./assets');

function serve() {
  'use strict';
  var requestCounter = 0;
  var serverHost = '127.0.0.1';
  var serverPort = 8000;

  http.createServer(function (request, response) {

    requestCounter++;
    var path = url.parse(request.url).path;
    console.log('#' + requestCounter + ' handling ' + path);

    if (/\.(js|json|css|jpg|png|gif|ico|svg)$/.test(path)) {
      assets.handle(path, response);
    }
    else {
      router.handle(path, request, response);
    }

  }).listen(serverPort, serverHost);

  console.log('Node server start listening at : ' + serverPort);
}

exports.serve = serve;

