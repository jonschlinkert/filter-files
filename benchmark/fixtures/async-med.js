var path = require('path');

module.exports = ['vendor', function(err, files, cb) {
  if (err) cb(err);
  console.log(files)
}];