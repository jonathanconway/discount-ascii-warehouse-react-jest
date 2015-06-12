var browserSync = require('browser-sync').create();

module.exports = {
	server: browserSync,
	reload: browserSync.reload
};