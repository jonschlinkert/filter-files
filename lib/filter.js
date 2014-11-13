'use strict';

/**
 * Handle filter function(s)
 */

module.exports = function filters(files, dir, fn, recurse) {
  var stack = Array.isArray(fn) ? fn : [fn];

  return stack.reduce(function(acc, cb) {
    return acc.filter(function (fp) {
      if (typeof fn !== 'function') {
        return acc;
      }
      return cb(fp, dir, acc, recurse);
    });
  }, files);
};