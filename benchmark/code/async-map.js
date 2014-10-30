'use strict';

var fs = require('fs');
var path = require('path');
var async = require('async');
var isDir = require('is-directory');

module.exports = function lookup(dir, cb) {
  fs.exists(dir, function(exists) {
    if (!exists) {
      return cb(null, []);
    }

    fs.readdir(dir, function(err, files) {
      if (err) {
        cb(err);
        return;
      }
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
            lookup(fp, function(err, matches) {
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
