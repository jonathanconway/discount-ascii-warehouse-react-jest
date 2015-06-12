function server () {
	var PORT = 2999,
		devServer = require('gulp-develop-server');

	return devServer.listen({
		path: 'index.js',
		env: {
			PORT: PORT
		},
		delay: 100
	});
}

module.exports = server;