/**
 * controller actions
 */

var template = require('./template');

var controllers = {
  home: {
    actions: {
      index: function (request, response) {
        'use strict';
        return template.render({
          title: 'Welcome',
          content: '<h1>Hello</h1><p>Hi there!</p>'
        });
      }
    }
  },
  page: {
    actions: {
      about: function (request, response) {
        'use strict';
        return template.render({
          title: 'About',
          content: '<h1>About</h1><p>Hi I am Komang!</p>'
        });
      }
    }
  },
  error: {
    actions: {
      notFound: function (request, response) {
        'use strict';
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.end();
      },
      error: function (request, response) {
        'use strict';
        response.writeHead(500, {'Content-Type': 'text/html'});
        response.end();
      }
    }
  }
};

function dispatch(handlerName, request, response) {
  'use strict';
  var pos = handlerName.indexOf('@');
  var ctrl = handlerName.substring(0, pos);
  var act = handlerName.substring(pos + 1);

  if (typeof(controllers[ctrl]['actions'][act]) === 'function') {
    try {
      var content = controllers[ctrl]['actions'][act](request, response);
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write(content);
      response.end();
    }
    catch (e) {
      //throw e;
      controllers['error']['actions']['error'](request, response);
    }
  }
  else {
    controllers['error']['actions']['notFound'](request, response);
  }

}

exports.dispatch = dispatch;
