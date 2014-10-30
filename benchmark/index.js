'use strict';

var Suite = require('benchmarked');
var suite = new Suite({
  result: false,
  fixtures: 'fixtures/sync-{med,shallow}.js',
  add: 'code/sync-*-filter.js',
  cwd: __dirname
});

suite.run();
