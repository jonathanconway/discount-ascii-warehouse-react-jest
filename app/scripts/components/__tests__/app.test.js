jest.dontMock('../app');

describe('app', function() {
	var React,
		App,
		TestUtils,
		productsService;

	beforeEach(function () {
		React = require('react/addons');
		App = require('../app');
		TestUtils = React.addons.TestUtils;
		productsService = require('../../services/productsService');
	});

	it('should call productsService for data on mount', function() {
		// Render
		var appEl = TestUtils.renderIntoDocument(
			<App />
		);

		// Verify
		expect(productsService.mock.calls.length).toBe(1);
	});

	it('should call productsService when a sort takes place, with appropriate params', function () {
		// Render
		var appEl = TestUtils.renderIntoDocument(
			<App />
		);
		appEl.onSort('price');

		// Verify
		expect(productsService.mock.calls[1][0].sort).toBe('price');
	});
});