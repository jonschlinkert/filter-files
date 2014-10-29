'use strict';

var path = require('path');
var isDir = require('is-directory');

module.exports = function isFile(fp, dir) {
  return !isDir(path.join(dir, fp));
};