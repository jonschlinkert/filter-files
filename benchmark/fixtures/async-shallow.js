var path = require('path');

module.exports = ['test', function(err, files, cb) {
  if (err) cb(err);
  console.log(files);
}];