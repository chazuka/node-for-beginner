/**
 * Basic static asset handler
 *
 * @author chz
 */
var path = require('path'),
    fs = require('fs'),
    mime = require('mime');

function handle(path_name, response) {
    'use strict';

    // Get requested path file
    var file_path = path.join(process.cwd(), 'public', path_name);

    // Check existence
    fs.exists(file_path, function (exists) {

        // Handle not found request
        if (!exists) {
            response.writeHead(404, {'Content-Type': 'text/html'});
            response.end();
            return;
        }

        // Asset exists, deliver!
        response.writeHead(200, {'Content-Type': mime.lookup(file_path)});

        var fileStream = fs.createReadStream(file_path);
        fileStream.on('end', function () {
            response.end();
        });

        fileStream.pipe(response);
    });
}

// export module
exports.handle = handle;