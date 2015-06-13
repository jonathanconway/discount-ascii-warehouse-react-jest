jest.dontMock('../app');

describe('app', function() {
	var React = require('react/addons'),
		App = require('../app'),
		TestUtils = React.addons.TestUtils,
		productsService = require('../../services/productsService');
	
	beforeEach(function () {
		// Mock
		productsService.get = jest.genMockFunction();
		productsService.get.mockReturnValue({ then: function () { } });
	});

	it('should call productsService for data on mount', function() {
		// Render
		var appEl = TestUtils.renderIntoDocument(<App />);

		// Verify
		expect(productsService.get.mock.calls.length).toBe(1);
	});

	it('should call productsService when a sort takes place, with appropriate params', function () {
		// Render
		var appEl = TestUtils.renderIntoDocument(<App />);

		// Act
		appEl.onSort('price');

		// Verify
		expect(productsService.get.mock.calls[1][0].sort).toBe('price');
	});
});