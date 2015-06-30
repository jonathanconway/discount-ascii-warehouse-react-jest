'use strict';

jest.dontMock('../productsApi');

describe('productsApi', function() {
	var productsApi = require('../productsApi');
	var $ = require('npm-zepto');

	it('should do an ajax call to fetch products from the server, passing only appropriate parameters', function() {
		// Run
		productsApi.getProducts({ sort: 'sort', limit: 5, skip: 3 }, function (products) {
			// Verify
			
			expect($.get.mock.calls[0][0].sort).toBe('sort');
			expect($.get.mock.calls[0][0].limit).toBe(5);
			expect($.get.mock.calls[0][0].skip).toBe(3);
		});
	});

	it('should return items as a JSON-serialised array', function() {
		$.get = jest.genMockFunction().mockImplementation(function(a, b, c) {
			c( '{ "a": "b" }\n{ "c": "d" }' );
		});

		// Run
		productsApi.getProducts({ sort: 'sort', limit: 5, skip: 3 }, function (products) {
			// Verify
			
			expect(products[0]).toEqual(jasmine.objectContaining({ a: 'b' }));
			expect(products[1]).toEqual(jasmine.objectContaining({ c: 'd' }));
		});
	});
});