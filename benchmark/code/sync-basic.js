'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function(dir) {
  return fs.readdirSync(dir).map(function (fp) {
    return path.join(dir, fp);
  })
};