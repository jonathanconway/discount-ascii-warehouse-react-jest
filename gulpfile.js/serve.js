var browserSync = require('./browserSync').server;

function serve() {
	browserSync.init({
		proxy: 'localhost:2999',
		port: 3002,
		browser: ['google chrome']
	});
}

module.exports = serve;