'use strict';

var fs = require('fs');
var path = require('path');
var isDir = require('is-directory');

module.exports = function lookup(dir, fn, recurse) {
  if (isFile(dir)) return dir;

  if (typeof fn !== 'function') {
    recurse = fn;
    fn = null;
  }

  return dirs(dir, fn).reduce(function (acc, fp) {
    fp = path.join(dir, fp);

    if (isDir(fp) && recurse !== false) {
      acc = acc.concat(lookup(fp, fn));
    } else {
      acc = acc.concat(fp);
    }
    return acc;
  }, []);
};

function dirs(dir, fn) {
  return filter(dir, fs.readdirSync(dir), fn);
}

function filter(dir, files, fn) {
  if (typeof fn !== 'function') {
    return files;
  }
  return files.filter(function (fp) {
    return fn(fp, dir, files);
  });
}

function isFile(fp) {
  return !isDir(fp);
}
