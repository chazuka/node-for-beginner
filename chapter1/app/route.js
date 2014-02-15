/**
 * Basic routing
 *
 * @author chz
 */

// load controller
var controller = require('./controller');

var uri_handler = {
    '/': 'index@index',
    '/about': 'page@about'
};

// dispatch request
function handle(uri_path, request, response) {
    'use strict';

    var handler = uri_handler[uri_path];

    if (typeof (handler) === 'undefined') {
        handler = 'error@error404';
    }

    controller.dispatch(handler, request, response);
}

exports.handle = handle;