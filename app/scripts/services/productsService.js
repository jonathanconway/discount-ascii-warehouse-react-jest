'use strict';

/** {object} Dictionary of: {string} sort field => {array} cached products */
var	productsCache = {};

/** {object} Stores options that were passed to the constructor */
var options = {};

/** {boolean} Is a request currently being processed? */
var processing = false;

var productsApi = require('./productsApi');


/**
 * Callback for fetchProducts. Return the first chunk, and cache the last.
 * @param {array} products - All products returned by the API.
 * @param {function} callback - Function to call when API responds. First parameter is array containing first chunk.
 */
function fetchProductsDone (products, sortBy, callback) {
	// append new products to cache
	var allProducts = productsCache[sortBy] = productsCache[sortBy].concat(products || []);

	if (callback) {
		callback(allProducts);
	}
}

/**
 * Fetches products from the API, returning the first chunk, and caching the last.
 * @param {string} sortBy - Field to sort by. Passed to the API.
 * @param {function} callback - Function to call when API responds.
 */
function fetchProducts (sortBy, callback) {
	// number of products currently in the cache under the specified sort criteria
	var productsCacheLength;

	// only process one request at a time.
	if (processing) {
		return;
	}
	processing = true;

	productsCacheLength = productsCache[sortBy].length;

	// call the products API, fetch only what is needed
	productsApi.getProducts({
		sort: sortBy,
		skip: productsCacheLength,				// skip products we already have
		limit: (options.prefetchSize * 2)		// precache as many as we need
	}, function (products) {
		fetchProductsDone(products, sortBy, callback);
		processing = false;
	});
}

/**
 * Retrieves and returns products from the cache and/or API, depending on whether there are enough in the cache.
 * @param {string} sortBy - Field to sort by. Used as a lookup for the cache.
 * @param {number} limitTo - Maximum number of products to request. Will determine how many to pre-fill from the API.
 * @param {function} callback - Function which returns products. First parameter is array containing products.
 */
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

/**
 * Stores options and exposes the service's methods.
 * @constructor
 * @param {object} initOptions - Can specify the following:
 *   prefetchSize - How many additional products to keep cached.
 */
function init (initOptions) {
	options.prefetchSize = initOptions.prefetchSize;

	return {
		getProducts: getProducts
	};
}

module.exports = { init: init };