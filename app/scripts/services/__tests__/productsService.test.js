'use strict';

jest.dontMock('../productsService');

describe('productsService', function() {

	function getArrayOfTwentyItems() {
		for (var y = []; y.length < 20; y.push(y.length)) { }
		return y;
	}

	it('should call the api if there are no products in the cache', function() {
		var PREFETCH_SIZE = 20,

			productsApi = require('../productsApi'),
			productsService = require('../productsService').init({ prefetchSize: PREFETCH_SIZE });

		// Mock
		productsApi.getProducts = jest.genMockFunction().mockImplementation(function(a, b) { b(); });

		// Run
		productsService.getProducts('sort' /* sortBy */, PREFETCH_SIZE /* limitTo */, function (products) {
			
			// Verify call
			expect(productsApi.getProducts.mock.calls[0][0].sort).toBe('sort');
			expect(productsApi.getProducts.mock.calls[0][0].skip).toBe(0);
			expect(productsApi.getProducts.mock.calls[0][0].limit).toBe(PREFETCH_SIZE * 2);
		});
	});

	it('should return products if there are products in the cache and call the api to prefetch more', function() {
		var PREFETCH_SIZE = 20,
			twentyItems = getArrayOfTwentyItems(),

			productsApi = require('../productsApi'),
			productsService = require('../productsService').init({ prefetchSize: PREFETCH_SIZE });


		// Mock
		productsApi.getProducts =
			jest.genMockFunction().mockImplementation(function(a, b) {
				b( twentyItems );
			});

		// Call the service multiple times and expect it to prefetch more items each time
		(function callGetProducts (howManyTimes, counter) {
			// Act
			productsService.getProducts('sort' /* sortBy */, (PREFETCH_SIZE * counter) /* limitTo */, function (products) {
				// Verify
				expect(productsApi.getProducts.mock.calls.slice(-1)[0][0].sort).toBe('sort');
				expect(productsApi.getProducts.mock.calls.slice(-1)[0][0].skip).toBe(PREFETCH_SIZE * (counter - 1));
				expect(productsApi.getProducts.mock.calls.slice(-1)[0][0].limit).toBe(PREFETCH_SIZE * (counter + 1));

				if (counter < howManyTimes) {
					callGetProducts(howManyTimes, counter + 1);
				}
			});
		}(3, 1));
	});
});