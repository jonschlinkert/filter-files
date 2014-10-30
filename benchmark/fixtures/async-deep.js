var path = require('path');

module.exports = ['node_modules', function(err, files, cb) {
  if (err) cb(err);
  console.log(files)
}];