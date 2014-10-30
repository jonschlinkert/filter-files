'use strict';

var fs = require('fs');
var path = require('path');
var isDir = require('is-directory');
var filter = require('./filter');

module.exports = function lookup(dir, fn, recurse) {
  if (typeof fn !== 'function') {
    recurse = fn;
    fn = null;
  }

  var files = fs.readdirSync(dir);

  return filter(files, dir, fn, recurse)
    .reduce(function (acc, fp) {
      fp = path.join(dir, fp);
      if (isDir(fp) && recurse !== false) {
        acc.push.apply(acc, lookup(fp, fn));
      } else {
        acc = acc.concat(fp);
      }
      return acc;
  }, []);
};