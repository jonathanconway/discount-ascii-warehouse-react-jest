'use strict';

var $ = require('../../../node_modules/npm-zepto/index'),
	Rsvp = require('../../../node_modules/rsvp/dist/rsvp');

function get (params, callback) {
	return new Rsvp.Promise(function(resolve, reject) {
		$.get(
			'/api',
			params,
			function (data) {
				var products = data.split('\n')
					.filter(function (line) {
						return line;
					})
					.map(function (line) {
						return JSON.parse(line);
					});

				resolve(products);
			}, function (err) {
				reject(err);
			});
	});
}

module.exports = {
	get: get 
};