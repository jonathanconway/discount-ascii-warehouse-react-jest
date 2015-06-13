jest.dontMock('../productsService');

describe('productsService', function() {
	var productsService = require('../productsService');

	it('should query the web service for products, when called, and return data', function() {
		var $ = require('../../../../node_modules/npm-zepto/index');

		spyOn($, 'get').andReturn([1,2,3]);

		// Run
		productsService.get({ sort: 'sort' }, function (returnPromise) {
			
			// Verify call
			expect($.get.mock.calls[0][0]).toBe(jasmine.any.String);
			expect($.get.mock.calls[0][1]).toBe(jasmine.objectContaining({ sort: 'sort' }));

			// Verify return value
			returnPromise.then(function (results) {
				expect(results).toBe([1,2,3]);
			});
		});
	});
});