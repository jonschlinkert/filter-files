'use strict';

var fs = require('fs');
var path = require('path');
var async = require('async');

module.exports = function lookup(dir, cb) {
  function recurse(dir, acc, cb) {
    fs.exists(dir, function(exists) {
      if (!exists) {
        return cb(null, []);
      }
      fs.readdir(dir, function(err, files) {
        if (err) {
          return cb(err);
        }

        async.reduce(files, acc, function(res, fp, next) {
          fp = path.join(dir, fp);

          fs.stat(fp, function(err, stats) {
            if (err) {
              return handle(err, next);
            }

            if (stats.isDirectory()) {
              recurse(fp, res, function(err, files) {
                next(null, files);
              });
            } else {
              next(null, res.concat(fp));
            }
          });
        }, function(err, files) {
          cb(err, files);
        });
      });
    });

  }
  return recurse(dir, [], cb);
}

function handle(err, next) {
  return (err.code !== 'ENOENT')
    ? next(err)
    : next();
}
