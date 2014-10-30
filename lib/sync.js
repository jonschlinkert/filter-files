'use strict';

var fs = require('fs');
var path = require('path');
var isDir = require('is-directory');
var filter = require('./filter');

module.exports = function lookup(dir, fn, recurse) {
  if (typeof fn !== 'function' && !Array.isArray(fn)) {
    recurse = fn;
    fn = null;
  }

  fn = Array.isArray(fn) ? fn : [fn];

  var res = fn.reduce(function(acc, cb) {
    return filter(acc, dir, cb, recurse);
  }, fs.readdirSync(dir));

  return res.reduce(function (acc, fp) {
      fp = path.join(dir, fp);
      if (isDir(fp) && recurse !== false) {
        acc.push.apply(acc, lookup(fp, fn));
      } else {
        acc = acc.concat(fp);
      }
      return acc;
  }, []);
};