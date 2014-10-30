'use strict';

var fs = require('fs');
var path = require('path');
var async = require('async');
var isDir = require('is-directory');

module.exports = function lookup(dir, re, cb) {
  if (typeof re === 'function') {
    cb = re;
    re = /.*/;
  }
  fs.exists(dir, function(exists) {
    if (!exists) {
      return cb(null, []);
    }

    fs.readdir(dir, function(err, files) {
      if (err) {
        cb(err);
        return;
      }

      async.map(files, function(fp, callback) {
        fp = path.join(dir, fp);

        callback(null, fp);
      }, function(err, fp) {
        if (err) {
          return cb(err);
        }

        var res = [];

        async.forEach(fp, function(fp, next) {
          fs.stat(fp, function(err, stats) {
            if (err) {
              return handle(err, next);
            }

            if (!stats.isDirectory()) {
              res.push(fp);
              next();
            } else {
              lookup(fp, re, function(err, matches) {
                res = res.concat(matches);
                next();
              });
            }
          });
        }, function(err) {
          cb(err, res);
        });
      });
    });
  });
}

function handle(err, next) {
  return (err.code !== 'ENOENT')
    ? next(err)
    : next();
}