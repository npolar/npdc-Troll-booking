var task = function(gulp, config) {
  'use strict';
  gulp.task('browserSync', function() {

    var path = require('path');
    var fs = require('fs');
    var browserSync = require('browser-sync').create();
    var html5Regex = new RegExp('\/(.*?)\/(.*)$');
    var runSequence = require('run-sequence').use(gulp);


    browserSync.init({
      server: {
        baseDir: [config.dist.root],
        middleware: function (req, res, next) {
          var location;
          // Enable CORS
          res.setHeader('Access-Control-Allow-Origin', '*');
          // Rewrite html5 urls
          var matches = html5Regex.exec(req.url);
          //console.log('req', req.url);
          var file = path.join(config.dist.root, req.url.split('?')[0]);
          //console.log('file', file, matches, !fs.existsSync(file));
          if (req.method === 'GET' && matches && !fs.existsSync(file)) {
            //console.log('no file -> hashbang!', file);
            location = '/'+matches[1]+'/#!'+matches[2];
            res.writeHead(302, {'Location': location});
            res.end();
          } else if (/app\.manifest/.test(file) && !config.appCache) {
            res.end();
          } else {
            //console.log('serve file', file);
            next();
          }
        },
        directory: config.dirListings || false
      },
      // Watch for updates in dist
      files: [config.dist.root+'/**/*',
      {
        match: config.dist.root+'/**/!(*manifest)',
        fn: function (ev, file) {
          if (ev === 'change' && config.appCache) {
            runSequence('manifest');
          }
        }
      }],
      // Disable input mirroring between connected browsers
      ghostMode: false,
      open: false,
      notify: false,
      ui: false
    });

  });
};

module.exports = task;
