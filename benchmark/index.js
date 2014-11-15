'use strict';

var Suite = require('benchmarked');
var suite = new Suite({
  result: false,
  add: 'code/sync-current.js',
  fixtures: 'fixtures/*.js',
  cwd: __dirname
});

suite.run(function (arg) {
  // shallow, don't recurse
  return arg.concat(false);
});
