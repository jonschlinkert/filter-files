'use strict';

var fs = require('fs');
var path = require('path');
var isDir = require('is-directory');

module.exports = function files(dir, fn, recurse) {
  if (!isDir(dir)) return dir;

  if (typeof fn !== 'function') {
    recurse = fn;
    fn = null;
  }

  return filter(dir, fn)
    .reduce(function (acc, fp) {
      fp = path.join(dir, fp);

      if (isDir(fp) && recurse !== false) {
        acc = acc.concat(files(fp, fn));
      } else {
        acc = acc.concat(fp);
      }
      return acc;
  }, []);
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
