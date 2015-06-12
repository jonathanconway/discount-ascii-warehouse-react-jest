jest.dontMock('../productsTable');

describe('productsTable', function() {
	var React,
		Products,
		ProductRow,
		TestUtils,
		testProducts;

	beforeEach(function () {
		React = require('react/addons');
		Products = require('../productsTable');
		ProductRow = require('../productRow');
		TestUtils = React.addons.TestUtils;
		testProducts = [1,2,3];
	});

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
		var accounting = require('../../../../node_modules/accounting/accounting.js'),
	    	productsTableEl = TestUtils.renderIntoDocument(
				<Products products={testProducts} />
		    );

	    // Verify
	    expect(ProductRow.mock.calls.length).toBe(testProducts.length);
	});
});