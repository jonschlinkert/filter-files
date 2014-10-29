'use strict';

var path = require('path');
var isDir = require('is-directory');

module.exports = function ext(extname, dirs, fp) {
  return function(fp, dir) {
    if (dirs !== false && isDir(path.join(dir, fp))) {
      return true;
    }
    return path.extname(fp) === extname;
  }
};
