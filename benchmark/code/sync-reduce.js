'use strict';

var fs = require('fs');
var path = require('path');
var isDir = require('is-directory');

module.exports = function lookup(dir, recurse) {
  return fs.readdirSync(dir)
    .reduce(function (acc, fp) {
      fp = path.join(dir, fp);
      if (isDir(fp) && recurse !== false) {
        acc.push.apply(acc, lookup(fp));
      } else {
        acc = acc.concat(fp);
      }
      return acc;
  }, []);
};