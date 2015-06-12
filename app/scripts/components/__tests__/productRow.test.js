jest.dontMock('../productRow');

describe('productRow', function() {
	var React,
		ProductRow,
		TestUtils,
		testProduct;

	beforeEach(function () {
		React = require('react/addons');
		ProductRow = require('../productRow');
		TestUtils = React.addons.TestUtils;
		testProduct = {
			id: 100,
			face: 'face',
			size: 's',
			price: 100
		};
	});

	it('should render as a row', function() {
		// Render
		var productRowEl = TestUtils.renderIntoDocument(
			<ProductRow product={testProduct} />
		);

		// Verify
		expect(productRowEl.getDOMNode().tagName).toBe('TR');
	});

	it('should render price as a currency', function() {
		// Render
		var accounting = require('../../../../node_modules/accounting/accounting.js'),
			productRowEl = TestUtils.renderIntoDocument(
				<ProductRow product={testProduct} />
			);

		// Verify
		expect(accounting.formatMoney.mock.calls[0][0]).toBe(testProduct.price);
	});
});