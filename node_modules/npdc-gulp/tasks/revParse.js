var task = function(gulp, config) {
  'use strict';

  var git = require('gulp-git');

  gulp.task('revParse', function(cb) {
    git.revParse({
      args: '--abbrev-ref HEAD',
      quiet: true
    }, function(err, ref) {
      global.ref = !ref || err ? 'master' : ref;
      cb();
    });
  });
};

module.exports = task;
