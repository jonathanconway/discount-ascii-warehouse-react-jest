'use strict';

jest.dontMock('../advertisementRow');

describe('advertisementRow', function() {
	var React = require('react/addons');
	var AdvertisementRow = require('../advertisementRow');
	var Advertisement = require('../advertisement');
	var TestUtils = React.addons.TestUtils;

	it('should render a table row containing an advertisement', function() {
		// Act
		var advertisementRowElDomNode = TestUtils.renderIntoDocument(<AdvertisementRow />).getDOMNode();

		// Verify
		expect(advertisementRowElDomNode._tagName).toEqual('tr');
		expect(Advertisement).toBeCalled();
	});
});