'use strict';

var fs = require('fs');
var path = require('path');
var isDir = require('is-directory');

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

module.exports = function lookup(dir, fn, recurse, cb) {
  if (typeof fn === 'boolean') {
    recurse = fn;
  }

  fs.readdir(dir, function(err, files) {

  });
};


module.exports.sync = function lookupSync(dir, fn, recurse) {
  if (typeof fn !== 'function') {
    recurse = fn;
    fn = null;
  }

  var files = filter(dir, fn);
  var len = files.length;
  var arr = [];
  var i = 0;

  while (len--) {
    var fp = path.join(dir, files[i++]);
    if (isDir(fp) && recurse !== false) {
      arr.push.apply(arr, lookupSync(fp, fn));
    } else {
      arr = arr.concat(fp);
    }
  }
  return arr;
};

function filter(dir, fn) {
  var files = fs.readdirSync(dir);
  if (typeof fn !== 'function') {
    return files;
  }
  return files.filter(function (fp) {
    return fn(fp, dir, files);
  });
}
