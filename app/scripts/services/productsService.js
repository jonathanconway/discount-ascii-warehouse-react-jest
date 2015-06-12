'use strict';

require('../../../node_modules/zepto/zepto.min');

function get (params, callback) {
	// console.log('zepto', zepto);
	Zepto.get('/api', params, function (data) {
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

