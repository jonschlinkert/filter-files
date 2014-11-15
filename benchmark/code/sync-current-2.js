'use strict';

var fs = require('fs');
var path = require('path');
var filters = require('../../lib/filter');

module.exports = function lookup(dir, recurse, fns) {
  if (typeof dir !== 'string') {
    throw new Error('filter-files expects the first arg to be a string, got: ', typeof dir);
  }

  var files = fs.readdirSync(dir);
  var arr = [];

  if (typeof recurse !== 'boolean') {
    fns = recurse;
    recurse = true;
  }

  try {
    if (fns) {
      files = filters(files, dir, fns, recurse);
    }

    if (recurse === false) {
      return files.map(function (fp) {
        return path.join(dir, fp);
      });
    }

    var len = files.length;
    var i = 0;

    while (len--) {
      var fp = path.join(dir, files[i++]);
      if (fs.statSync(fp).isDirectory()) {
        arr.push.apply(arr, lookup(fp, fns));
      } else {
        arr = arr.concat(fp);
      }
    }
  } catch(err) {
    return console.log(err);
  }

  return arr;
};