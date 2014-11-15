'use strict';

var fs = require('fs');
var path = require('path');
var isDir = require('is-directory');
var filter = require('../../lib/filter');

module.exports = function lookup(dir, recurse, fn) {
  if (typeof recurse !== 'boolean') {
    fn = recurse;
  }

  var files = filter(fs.readdirSync(dir), dir, fn, recurse);

  return files.reduce(function (acc, fp) {
    fp = path.join(dir, fp);
    if (isDir(fp) && recurse !== false) {
      acc.push.apply(acc, lookup(fp, fn));
    } else {
      acc = acc.concat(fp);
    }
    return acc;
  }, []);
};
