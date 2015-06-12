var gulp = require('gulp'),
	path = require('path'),
	server = require('./server'),
	reload = require('./browserSync').reload;

function watch() {
	gulp.watch([
		path.join('app/**/*.js')
	], ['scripts', reload]);
}

module.exports = watch;