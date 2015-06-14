'use strict';

var	productsCache = {},
	options = {},

	productsApi = require('./productsApi');

function fetchProducts (sortBy, callback) {
	// number of products currently in the cache under the specified sort criteria
	var productsCacheLength = productsCache[sortBy].length;

	// call the products API, fetch only what is needed
	productsApi.getProducts({
		sort: sortBy,
		skip: productsCacheLength,				// skip products we already have
		limit: (productsCacheLength === 0)		// precache as many as we need
				? (options.prefetchSize * 2)
				: (productsCacheLength + (options.prefetchSize * 2))
	}, function (products) {
		// append new products to cache
		var allProducts = productsCache[sortBy] = productsCache[sortBy].concat(products || []);

		if (callback) {
			callback(allProducts);
		}
	});
}

function getProducts (sortBy, limitTo, callback) {
	// are there enough products in the cache to service this request?
	if (productsCache[sortBy] && productsCache[sortBy].length >= limitTo) {

		// return the results
		callback(productsCache[sortBy].slice(0, limitTo));

		// prefetch some more products
		fetchProducts(sortBy);
	}
	else {
		// ensure there's an entry for the specified sort criteria
		productsCache[sortBy] = productsCache[sortBy] || [];

		// prefetch products and return the results
		fetchProducts(sortBy, function (products) {
			callback(products.slice(0, limitTo));
		});
	}
}

function init (initOptions) {
	options.prefetchSize = initOptions.prefetchSize;

	return {
		getProducts: getProducts
	};
}

module.exports = { init: init };