'use strict';

var express = require('express'),
	path = require('path'),
	app = express(),
	dirName = path.dirname(module.uri),
	port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/static'));
app.get('/ad', require('./lib/http-handle-ads'));
app.get('/api', require('./lib/http-handle-api'));

console.log('Listening on http://localhost:%d', port);
app.listen(port);