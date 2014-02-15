/**
 * Basic HTTP server using native node http module
 *
 * @author chz
 */

var http = require('http'),
    url = require('url');

var router = require('./route'),
    assets = require('./assets');

// Main
function serve() {
    'use strict';

    // Count request handled so far
    var requestCounter = 0;

    // Host where http-server listen to
    var serverHost = '127.0.0.1';

    // Port where http-server listen to
    var serverPort = 8000;

    // Let's go
    http.createServer(function (request, response) {

        // Increment request count
        requestCounter++;

        // Parse uri
        var path = url.parse(request.url).path;

        // Log to see what uri bing handled
        console.log('#' + requestCounter + ' handling ' + request.url);

        // Simple regex matcher to distinct static asset and dynamic request
        if (/\.(js|json|css|jpg|png|gif|ico|svg)$/.test(path)) {
            // handle static assets, this could be handled via nginx
            assets.handle(path, response);
        }
        else {
            // fine, handle dynamic request
            router.handle(path, request, response);
        }

    }).listen(serverPort, serverHost);

    // Just a log to notice that node server is start listening
    console.log('Node start listening at ' + serverHost + ':' + serverPort);
}

// exports module
exports.serve = serve;

