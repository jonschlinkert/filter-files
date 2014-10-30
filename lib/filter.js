'use strict';

module.exports = function filter(files, dir, fn, recurse) {
  if (typeof fn !== 'function') {
    return files;
  }
  return files.filter(function (fp) {
    return fn(fp, dir, files, recurse);
  });
};