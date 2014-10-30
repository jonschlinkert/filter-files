var fs = require('fs');
var path = require('path');
var async = require('async');
var isDir = require('is-directory');

// lookup - recursively grabs file paths that match the passed pattern.
function lookup(dir, pattern, cb) {
  fs.exists(dir, function(exists) {
    if (!exists) {
      return cb(null, []);
    }

    fs.readdir(dir, function(err, files) {
      if (err) {
        cb(err);
        return;
      }

      async.map(files, function(file, next) {
        var fp = path.join(dir, file);
        fs.stat(fp, function(err, stats) {
          next(err, {fp: fp, stats: stats});
        });
      }, function(err, info) {
        if (err) {
          return cb(err);
        }

        var res = [];

        async.forEach(info, function(item, next) {
          if (item.stats.isFile() && pattern.test(item.fp)) {
            res.push(item.fp);
            next();
          } else if (item.stats.isDirectory()) {
            lookup(item.fp, pattern, function(err, rMatches) {
              res = res.concat(rMatches);
              next();
            });
          } else {
            next();
          }
        }, function(err) {
          cb(err, res);
        });
      });
    });
  });
}

lookup('test', /.*/, function(err, files) {
  console.log(files)
});