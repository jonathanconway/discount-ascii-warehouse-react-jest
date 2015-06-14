'use strict';

var	$ = require('../../../node_modules/npm-zepto/index');

function getProducts (params, callback) {
	$.get(
		'/api',
		{
			sort: params.sort,
			limit: params.limit,
			skip: params.skip
		},
		function (data) {
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

module.exports = {
	getProducts: getProducts
};