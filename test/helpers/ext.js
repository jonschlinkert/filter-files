'use strict';

var path = require('path');
var isDir = require('is-directory');

module.exports = function ext(extname, dirs) {
  return function(fp, dir) {
    if (dirs && isDir(path.join(dir, fp))) {
      return true;
    }
    return path.extname(fp) === extname;
  }
};
