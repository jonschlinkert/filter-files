'use strict';

var fs = require('fs');
var path = require('path');
var async = require('async');
var filter = require('./filter');

module.exports = function lookup(dir, fn, recurse, cb) {
  if (typeof recurse !== 'boolean') {
    cb = recurse;
    recurse = true;
  }
  if (arguments.length === 2) {
    cb = fn;
    fn = null;
  }

  fs.exists(dir, function(exists) {
    if (!exists) {
      return cb(null, []);
    }

    fs.readdir(dir, function(err, files) {
      if (err) {
        return cb(err);
      }

      files = filter(files, dir, fn);
      var res = [];

      async.map(files, function(fp, next) {
        fp = path.join(dir, fp);

        fs.stat(fp, function(err, stats) {
          if (err) {
            return handle(err, next);
          }

          if (!stats.isDirectory()) {
            next(null, res.push(fp));
          } else {
            lookup(fp, fn, function(err, matches) {
              res = res.concat(matches);
              next(null, res);
            });
          }
        });
      }, function(err) {
        cb(err, res);
      });
    });
  });
};

function handle(err, next) {
  return (err.code !== 'ENOENT')
    ? next(err)
    : next();
}