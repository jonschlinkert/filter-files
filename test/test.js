/*!
 * filter-files <https://github.com/jonschlinkert/filter-files>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var path = require('path');
var should = require('should');
var isDir = require('is-directory');
var files = require('..');

// helpers
var normalize = require('./helpers/normalize');
var exclude = require('./helpers/exclude');
var include = require('./helpers/include');
var isFile = require('./helpers/is-file');
var ext = require('./helpers/ext');

// expected
var all = require('./expected/all');
var js = require('./expected/js');
var md = require('./expected/md');

// console.log(files('node_modules', exclude(/node_modules/)))

// tests
describe('filter', function () {
  describe('recurse: true', function () {
    describe('no filter function:', function () {
      it('should return all files:', function () {
        normalize(files('test/fixtures')).should.eql(all);
      });

      it('should return only js files:', function () {
        normalize(files('test/fixtures', ext('.js', true))).should.eql(js);
      });
      it('should return only md files:', function () {
        normalize(files('test/fixtures', ext('.md', true))).should.eql(md);
      });
    });
  });

  describe('recurse: false', function () {
    it('should use a filter function to return only files', function () {
      normalize(files('test/fixtures', isFile, false)).should.eql([
        'test/fixtures/a.js',
        'test/fixtures/a.md',
        'test/fixtures/b.js',
        'test/fixtures/b.md',
        'test/fixtures/c.js',
        'test/fixtures/c.md',
      ]);
    });

    it('should use a filter function to return only javascript files', function () {
      normalize(files('test/fixtures', ext('.js'), false)).should.eql([
        'test/fixtures/a.js',
        'test/fixtures/b.js',
        'test/fixtures/c.js'
      ]);
    });
  });
});
