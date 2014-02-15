/**
 * Basic controller
 *
 * @author chz
 */
var template = require('./template');

// Controller
var controllers = {

    // Index Controller
    index: {
        actions: {
            // Homepage
            index: function (request, response) {
                'use strict';

                return template.render({
                    page_title:'Node.js for beginner',
                    title: 'Hello,',
                    content: "Let's taste the awesomeness"
                },'homepage');
            }
        }
    },

    // Page Controller
    page: {
        actions: {
            // About
            about: function (request, response) {
                'use strict';

                return template.render({
                    page_title:'About Node',
                    action_results: '<h1>Hello, I am Node</h1><p>Let me guess, You must be a dinosaur</p>'
                });
            }
        }
    },

    // Error actions
    error: {
        actions: {
            // 404 handler
            error404: function (request, response) {
                'use strict';
                response.writeHead(404, {'Content-Type': 'text/html'});
                return template.render({},'404');
            },
            // 500 handler
            error500: function (request, response) {
                'use strict';
                response.writeHead(500, {'Content-Type': 'text/html'});
                return template.render({},'500');
            }
        }
    }
};

// Dispatch request
function dispatch(handler_name, request, response) {
    'use strict';

    // Parse route handler into controller-action
    var pos = handler_name.indexOf('@');
    var ctrl = handler_name.substring(0, pos);
    var act = handler_name.substring(pos + 1);

    // Validate if controller action is callable
    if (controllers.hasOwnProperty(ctrl) && typeof(controllers[ctrl]['actions'][act]) === 'function') {
        try {
            var content = controllers[ctrl]['actions'][act](request, response);
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(content);
            response.end();
        }
        catch (e) {
            //throw e;
            controllers.error.actions.error500(request, response);
        }
    }
    else {
        // Ooops, no callable handler defined
        controllers.error.actions.error404(request, response);
    }

}

// export module
exports.dispatch = dispatch;
