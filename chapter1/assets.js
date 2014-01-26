var path = require('path'),
  fs = require('fs'),
  mime = require('mime');

function handle(pathname, response) {
  'use strict';
  var filename = path.join(process.cwd(), pathname);

  path.exists(filename, function (exists) {
    if (!exists) {
      response.writeHead(404, {'Content-Type': 'text/html'});
      response.end();
      return;
    }

    response.writeHead(200, {'Content-Type': mime.lookup(filename)});

    var fileStream = fs.createReadStream(filename);
    fileStream.on('end', function () {
      response.end();
    });

    fileStream.pipe(response);
  });
}

exports.handle = handle;