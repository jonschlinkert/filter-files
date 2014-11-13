# filter-files [![NPM version](https://badge.fury.io/js/filter-files.svg)](http://badge.fury.io/js/filter-files)

> Recursively read directories and return a list of files, filtered to have only the files for which the (optional) filter function returns `true`. Sync and async.

## Install
### Install with [npm](npmjs.org)

```bash
npm i filter-files --save
```

## Run tests

```bash
npm test
```

## Usage

```js
var filter = require('filter-files');
```

### sync

```js
filter.sync(dir, [filterFn], [recurse]));
```
**Params**

 - `dir` **{String}**: the directory to start from. Returns all files, recursively, starting with this path.
 - `filterFn` **{Function}**: optionally pass a filter function to use for filtering files/dirs. This function filters "on the fly", so recursion is very fast.
 - `recurse` **{Boolean}**: pass `false` to disable recursion.

**Examples**

```js
var files = filter.sync('lib');
console.log(files);
//=> [ 'lib/async.js', 'lib/filter.js', 'lib/sync.js' ]
```

Pass a filter function:

```js
filter.sync('lib', function(fp) {
  return /a/.test(fp);
});
//=> [ 'lib/async.js' ]
```

Or an array of filter functions:

```js
function include(fp) {
  return /^\./.test(fp);
}
function exclude(fp) {
  return !/^\.[jntv]/.test(fp);
}

// `false` means "don't recurse"
filter('.', [include, exclude], false);
//=> ['.git', '.gitignore', '.gitattribuets']
```

### async

```js
filter(dir, [filterFn], [recurse], callback));
```
**Params**

Same as sync with the addition of `callback`.

**Examples**

```js
filter('lib', function(err, files) {
  console.log(files);
  //=> [ 'lib/async.js', 'lib/filter.js', 'lib/sync.js' ]
});
```

Pass a filter function:

```js
var fn = function(fp) {
  return /a/.test(fp);
};

filter('lib', fn, function(err, files) {
  console.log(files);
  //=> [ 'lib/async.js' ]
});
```

### Filtering

Filter functions take four parameters and return `true` or `false`.

**Params**

 - `fp` filepath being looped over
 - `dir` current directory
 - `files` accumulated array of files
 - `recurse` whether recurse is `true` or `false`

**Example**

This function returns a filter function for getting files with the given `extname`:

```js
var path = require('path');
var isDir = require('is-directory');

function ext(extname) {
  // this is our filter function
  return function filter(fp, dir, files, recurse) {
    if (isDir(path.join(dir, fp)) && recurse === true) {
      return true;
    }
    return path.extname(fp) === extname;
  }
}
```

See [the tests](./test/test.js) for more examples.


## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/filter-files/issues).

## Author

**Jon Schlinkert**
 
+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 

## License
Copyright (c) 2014 Jon Schlinkert  
Released under the MIT license

***

_This file was generated by [verb](https://github.com/jonschlinkert/verb) on November 13, 2014._