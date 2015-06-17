'use strict';

jest.dontMock('../app');

describe('app', function() {
	var React = require('react/addons');
	var App = require('../app');
	var TestUtils = React.addons.TestUtils;
	var productsService = require('../../services/productsService');

	it('should call productsService for data on mount', function() {
		var getProducts = jest.genMockFunction();
		var appEl;

		// Mock
		getProducts.mockImplementation(function (a, b, c) {
			c();
		});
		productsService.init = jest.genMockFunction();
		productsService.init.mockImplementation(function () {
			return { getProducts: getProducts };
		});

		// Act
		appEl = TestUtils.renderIntoDocument(<App />);

		// Verify
		expect(getProducts.mock.calls[0][0]).toBe('');
		expect(getProducts.mock.calls[0][1]).toBe(20);
		expect(getProducts.mock.calls[0][2]).toEqual(jasmine.any(Function));
	});
});