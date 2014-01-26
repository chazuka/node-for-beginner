var controller = require('./controller');

var requestHandlerMapping = {
  '/': 'home@index',
  '/about': 'page@about'
};

function handle(pathname, request, response) {
  'use strict';
  var handlerName = requestHandlerMapping[pathname];
  if (typeof (handlerName) === 'undefined') {
    handlerName = 'error@notFound';
  }
  controller.dispatch(handlerName, request, response);
}

exports.handle = handle;