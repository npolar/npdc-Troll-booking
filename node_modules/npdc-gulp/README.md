# npdc-gulp
Exposes tasks for apps and support modules.

## Usage
Add this repo as a devDependency in package.json and install.  
For apps use this gulpfile:

    var gulp = require('gulp');
    var npdcGulp = require('npdc-gulp');
    npdcGulp.loadAppTasks(gulp);

For support modules use this gulpfile:

    var gulp = require('gulp');
    var npdcGulp = require('npdc-gulp');
    npdcGulp.loadModuleTasks(gulp);

List tasks with ```gulp --tasks```

### Custom config
You can extend the default gulp configuration by passing you own config object which will be merged with the defaults. E.g.

    npdcGulp.loadAppTasks(gulp, {
      'deps': {
        'css': ['node_modules/rome/dist/rome.min.css']
      }
    });

For details on config merging see: https://github.com/kurtmilam/underscoreDeepExtend
The default config is available at ```npdcGulp.baseConfig```.

## Tasks
Daily development is done on the default task, so just run ```gulp```!

## deploy-test
Deploys current dist folder to test.

## tag
git tags current version.

## bump
Bumps module version.

## release
build -> bump -> tag -> deploy to production
