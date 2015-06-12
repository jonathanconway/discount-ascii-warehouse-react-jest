function scripts() {
	var gulp = require('gulp'),
		babel = require('gulp-babel'),
		webpack = require('gulp-webpack');

	return gulp
		.src(['app/scripts/**/*.js', '!app/scripts/**/*.test.js'])
		.pipe(babel())
		.pipe(gulp.dest('static/scripts'))
		.pipe(webpack({ output: { filename: 'app.js' } }))
		.pipe(gulp.dest('static/scripts'));
}
module.exports = scripts;