'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function lookup(dir, recurse, l) {
  if (typeof dir !== 'string') {
    throw new Error('recurser expects a string as the first argument.');
  }

  var files = [];
  try {
    files = fs.readdirSync(dir);
  } catch(err) {
    return files;
  }

  var len = files.length;
  var i = 0;
  var arr = [];

  l = l || 1;
  if (l > recurse && files.length > 0) {
    return files.map(function (fp) {
      return path.join(dir, fp);
    });
  }

  while (len--) {
    var fp = path.join(dir, files[i++]);
    if (fs.statSync(fp).isDirectory()) {
      l++;
      arr.push.apply(arr, lookup(fp, recurse, l));
    } else {
      arr = arr.concat(fp);
    }
  }

  return arr;
}
