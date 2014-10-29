'use strict';

var path = require('path');
var isDir = require('is-directory');

module.exports = function include(re, dirs) {
  return function(fp, dir) {
    if (dirs && isDir(path.join(dir, fp))) {
      return true;
    }
    return re.test(fp);
  }
};
