'use strict';

var	$ = require('npm-zepto');

/**
 * Fetches products from the API, via an AJAX call.
 * @param {object} params - Forwarded in the web-service call. Can contain `sort`, `limit` and/or `skip`.
 * @param {function} callback - Function to call when response is received. First parameter contains array of products.
 */
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