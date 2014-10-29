'use strict';

module.exports = function normalize(files) {
  return files.map(function(fp) {
    return fp.replace(/[\\\/]+/g, '/');
  });
};