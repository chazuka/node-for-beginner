function render(params) {
  'use strict';
  var tpl = '<!doctype html>' +
    '<html>' +
    '<head>' +
    '<title>{title}</title>' +
    '<link rel="stylesheet" href="assets/style.css">' +
    '<link rel="stylesheet" href="assets/not_found.css">' +
    '</head>' +
    '<body>{content}</body>' +
    '</html>';
  for (var i in params) {
    if (params.hasOwnProperty(i)) {
      tpl = tpl.replace(eval('/{' + i + '}/gim'), params[i]);
    }
  }
  return tpl;
}

exports.render = render;