'use strict';


var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'gulp.*'],
	scope: ['dependencies', 'devDependencies'],
	replaceString: /^gulp(-|\.)/,
	camelize: true,
	lazy: true,
	rename: {},
});

global.gulp = plugins.help(gulp);
global.plugins = plugins;
