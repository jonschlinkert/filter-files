'use strict';

var fs = require('fs');
var path = require('path');
var isDir = require('is-directory');
var filter = require('../../lib/filter');

module.exports = function lookup(dir, fn, recurse) {
  if (typeof fn !== 'function') {
    recurse = fn;
    fn = null;
  }

  var files = filter(fs.readdirSync(dir), dir, fn);
  var len = files.length;
  var arr = [];
  var i = 0;

  while (len--) {
    var fp = path.join(dir, files[i++]);
    if (isDir(fp) && recurse !== false) {
      arr.push.apply(arr, lookup(fp, fn));
    } else {
      arr = arr.concat(fp);
    }
  }
  return arr;
};
