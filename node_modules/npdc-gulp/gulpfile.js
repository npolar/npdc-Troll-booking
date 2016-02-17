var gulp = require('gulp');
require('./tasks/bump')(gulp);
require('./tasks/tag')(gulp);
