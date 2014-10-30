'use strict';

var fs = require('fs');
var path = require('path');
var async = require('async');
var isDir = require('is-directory');

function lookup(dir, cb) {
  if (arguments.length > 2 && typeof recurse === 'function') {
    cb = recurse;
    recurse = true;
  }

  fs.readdir(dir, function(err, files) {
    async.reduce(files, [], function(acc, fp, next) {
      if (err) {
        next(err);
        return;
      }

      fp = path.join(dir, fp);
      if (isDir(fp)) {
        acc = acc.concat(lookup(fp, cb));
      } else {
        acc = acc.concat(fp);
      }

      next(null, acc);
    }, cb);
  });
}

lookup('test', function(err, files) {
  if (err) {
    console.log(err);
  }
  // console.log(files)
});

// module.exports = function lookup(dir, fn, recurse) {
//   if (typeof fn !== 'function') {
//     recurse = fn;
//     fn = null;
//   }

//   var files = filter(dir, fn);

//   return files.reduce(function (acc, fp) {
//     fp = path.join(dir, fp);
//     if (isDir(fp) && recurse !== false) {
//       acc.push.apply(acc, lookup(fp, fn));
//     } else {
//       acc = acc.concat(fp);
//     }
//     return acc;
//   }, []);
// };


// module.exports = function lookup(dir, fn, recurse, cb) {
//   if (arguments.length > 2 && typeof recurse === 'function') {
//     cb = recurse;
//     recurse = true;
//   }

//   async.reduce(dir, [], function (ret, fp, next) {
//     var process = union;

//     if (fp[0] === '!') {
//       fp = fp.slice(1);
//       process = diff;
//     }

//     fs.readdir(fp, recurse, function (err, paths) {
//       if (err) {
//         next(err);
//         return;
//       }

//       next(null, process(ret, paths));
//     });
//   }, cb);
// };



module.exports = function lookup(dir, fn, recurse) {
  if (typeof fn !== 'function') {
    recurse = fn;
    fn = null;
  }

  var files = filter(dir, fn);

  return files.reduce(function (acc, fp) {
    fp = path.join(dir, fp);
    if (isDir(fp) && recurse !== false) {
      acc.push.apply(acc, lookup(fp, fn));
    } else {
      acc = acc.concat(fp);
    }
    return acc;
  }, []);
};


// function filter(dir, fn) {
//   var files = fs.readdirSync(dir);
//   if (typeof fn !== 'function') {
//     return files;
//   }
//   return files.filter(function (fp) {
//     return fn(fp, dir, files);
//   });
// }