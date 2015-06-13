'use strict';

var $ = require('../../../node_modules/npm-zepto/index');

function get (params, callback) {
	$.get('/api', params, function (data) {
		var products = data.split('\n')
			.filter(function (line) {
				return line;
			})
			.map(function (line) {
				return JSON.parse(line);
			});
		callback(products);
	});
}

module.exports = get;