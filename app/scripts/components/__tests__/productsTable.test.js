'use strict';

jest.dontMock('../productsTable');

describe('productsTable', function() {
	var React = require('react/addons'),
		Products = require('../productsTable'),
		ProductRow = require('../productRow'),
		TestUtils = React.addons.TestUtils,
		testProducts = [{ id: 1 }, { id: 2 }, { id: 3 }];

	it('should render as a table', function() {
		// Render
		var productsTableEl = TestUtils.renderIntoDocument(
			<Products products={[]} />
		);

		// Verify
		expect(productsTableEl.getDOMNode().tagName).toBe('TABLE');
	});

	it('should render as many rows as there are products supplied', function () {
		// Render
		var productsTableEl = TestUtils.renderIntoDocument(
				<Products products={testProducts} />
			);

		// Verify
		expect(ProductRow.mock.calls.length).toBe(testProducts.length);
	});

	it('should render an "empty" row if 0 products are supplied', function () {
		// Render
		var productsTableEl = TestUtils.renderIntoDocument(
				<Products products={testProducts} />
			);

		// Verify
		expect(productsTableEl.getDOMNode().getElementsByTagName('TR').length).toBe(1);
	});

	it('should request more products if window scroll to bottom event occurs', function () {
		// Mock
		spyOn(window, 'addEventListener');

		// Render
		var productsTableEl = TestUtils.renderIntoDocument(
				<Products products={testProducts} />
			);

		// Verify
		expect(window.addEventListener).toHaveBeenCalledWith('scrollToBottom', jasmine.any(Function));
	});
});