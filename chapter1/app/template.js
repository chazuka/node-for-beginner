/**
 * Basic template handler
 * in production better to use template engine
 *
 * @author chz
 */
var fs = require('fs'),
    path = require('path');

/**
 * Replace all placeholders with params value
 *
 * @param string content
 * @param object params
 *
 * @returns string
 */
function feed(content, params) {
    "use strict";

    // match placeholders {{var}}
    var p = /{{([a-z0-9_-]+)}}/;

    // flag found placeholder in template
    var f;

    // lets go, feeding placeholders with params
    // otherwise wipe it out
    do {
        f = p.exec(content);
        if(f) {
            var rv = new RegExp(f[0],'gi');
            content = content.replace(rv, params[f[1]] || '');
        }
    } while (f);

    return content;
}

/**
 * Parse template file and feed the content
 *
 * @param string template_file
 * @param object params
 *
 * @returns string
 */
function parse(template_file, params) {
    "use strict";
    return feed(fs.readFileSync(template_file).toString(), params);
}

function render(params, view_template) {
    'use strict';

    // set default action results from defined params
    var action_results = params.action_results || '';

    // when template is explicitly defined use it
    if(typeof view_template === 'string') {
        var view_template_path = path.join(process.cwd(), 'app/views/'+view_template+'.tpl.html');
        if(fs.existsSync(view_template_path)) {
            action_results = parse(view_template_path, params);
        }
    }

    // push back into params
    params.action_results = action_results;

    // render with layout
    return parse(path.join(process.cwd(), 'app/views/layout.tpl.html'), params);
}

exports.parse = parse;
exports.render = render;