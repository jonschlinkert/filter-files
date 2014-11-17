'use strict';

var fs = require('fs');
var path = require('path');
var filters = require('./filter');

module.exports = function lookup(dir, recurse, fns) {
  if (typeof dir !== 'string') {
    throw new Error('filter-files expects the first arg to be a string, got: ', typeof dir);
  }

  if (typeof recurse !== 'boolean') {
    fns = recurse;
    recurse = true;
  }
  var arr = [];
  try {
    var files = fs.readdirSync(dir);
    if (fns) {
      files = filters(files, dir, fns, recurse);
    }

    var len = files.length;
    var i = 0;

    while (len--) {
      var fp = path.join(dir, files[i++]);
      if (fs.statSync(fp).isDirectory() && recurse) {
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