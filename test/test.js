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

// tests
describe('filter', function () {
  describe('async', function () {
    describe('recurse', function () {
      describe('no filter function:', function () {
        it('should return all files:', function (done) {
          files('test/fixtures', function (err, files) {
            normalize(files).should.eql(all);
            done()
          });
        });

        it('should return only js files:', function (done) {
          files('test/fixtures', ext('.js'), function (err, files) {
            normalize(files).should.eql(js);
            done();
          });
        });

        it('should return only md files:', function (done) {
          files('test/fixtures', ext('.md'), function (err, files) {
            normalize(files).should.eql(md);
            done();
          });
        });
      });
    });

    describe('no recurse', function (done) {
      it('should use a filter function to return only files', function (done) {
        files('test/fixtures', isFile, false, function (err, files) {
          normalize(files).should.eql([
            'test/fixtures/a.js',
            'test/fixtures/a.md',
            'test/fixtures/b.js',
            'test/fixtures/b.md',
            'test/fixtures/c.js',
            'test/fixtures/c.md',
          ]);
          done();
        });
      });

      it('should use a filter function to return only javascript files', function (done) {
        files('test/fixtures', ext('.js', false), false, function (err, files) {
          normalize(files).should.eql([
            'test/fixtures/a.js',
            'test/fixtures/b.js',
            'test/fixtures/c.js'
          ]);
          done();
        });
      });
    });
  });
  describe('sync', function () {
    describe('recurse', function () {
      describe('no filter function:', function () {
        it('should return all files:', function () {
          normalize(files.sync('test/fixtures')).should.eql(all);
        });

        it('should return only js files:', function () {
          normalize(files.sync('test/fixtures', ext('.js'))).should.eql(js);
        });

        it('should return only md files:', function () {
          normalize(files.sync('test/fixtures', ext('.md'))).should.eql(md);
        });
      });
    });

    describe('no recurse', function () {
      it('should use a filter function to return only files', function () {
        normalize(files.sync('test/fixtures', isFile, false)).should.eql([
          'test/fixtures/a.js',
          'test/fixtures/a.md',
          'test/fixtures/b.js',
          'test/fixtures/b.md',
          'test/fixtures/c.js',
          'test/fixtures/c.md',
        ]);
      });

      it('should use a filter function to return only javascript files', function () {
        normalize(files.sync('test/fixtures', ext('.js', false), false)).should.eql([
          'test/fixtures/a.js',
          'test/fixtures/b.js',
          'test/fixtures/c.js'
        ]);
      });
    });
  });
});
