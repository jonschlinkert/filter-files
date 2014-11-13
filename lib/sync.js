'use strict';

var fs = require('fs');
var path = require('path');
var filters = require('./filter');

module.exports = function lookup(dir, fns, recurse) {
  if (typeof fns !== 'function' && !Array.isArray(fns)) {
    recurse = fns;
    fns = null;
  }

  var files = fns
    ? filters(fs.readdirSync(dir), dir, fns, recurse)
    : fs.readdirSync(dir);

  var len = files.length;
  var arr = [];
  var i = 0;

  while (len--) {
    var fp = path.join(dir, files[i++]);
    if (fs.statSync(fp).isDirectory() && recurse !== false) {
      arr.push.apply(arr, lookup(fp, fns));
    } else {
      arr = arr.concat(fp);
    }
  }

  return arr;
};