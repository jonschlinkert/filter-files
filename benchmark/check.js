'use strict';

var path = require('path');
var util = require('util');
var glob = require('glob');
var chalk = require('chalk');


/**
 * Sanity check
 *
 * Run to ensure that all fns return the same, correct result.
 */

/**
 * sync
 */

glob.sync(__dirname + '/code/sync-reduce.js').forEach(function (fp) {
  var fn = require(path.resolve(__dirname, 'code', fp));
  var name = path.basename(fp, path.extname(fp));
  var fixtures = glob.sync(__dirname + '/fixtures/async-{med,shallow}.js');
  fixtures.forEach(function (fixture) {
    console.log(chalk.bold(name) + ':', inspect(fn.apply(fn, require(fixture))));
  });
});

/**
 * async
 */

glob(__dirname + '/fixtures/async-{med,shallow}.js', function (err, fixtures) {
  fixtures.forEach(function(fixture) {
    glob(__dirname + '/code/async*.js', function (err, files) {
      files.forEach(function(fp) {
        var fn = require(path.resolve(__dirname, 'code', fp));
        var name = path.basename(fp, path.extname(fp));
        fn.apply(fn, require(fixture), function(err, files) {
          console.log(chalk.bold(name) + ':', inspect(files));
        });
      });
    });
  });
});

function inspect(o) {
  var str = util.inspect(o, {depth: null});
  return str.replace(/[\s\n]+/g, ' ');
}
