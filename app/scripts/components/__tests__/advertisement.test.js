'use strict';

jest.dontMock('../advertisement');

describe('advertisementRow', function() {
	var React = require('react/addons');
	var Advertisement = require('../advertisement');
	var TestUtils = React.addons.TestUtils;

	it('should render an img tag, each time with a different parameter passed to the url', function() {
		// Act
		var advertisement = <Advertisement />;
		var advertisementEl = TestUtils.renderIntoDocument(advertisement);
		var advertisementEl2 = TestUtils.renderIntoDocument(advertisement);
		var src1 = advertisementEl.getDOMNode().src;
		var src2 = advertisementEl2.getDOMNode().src;

		// Verify
		expect(src1.split('=')[0]).toEqual(src2.split('=')[0]);
		expect(src1.split('=')[1]).not.toEqual(src2.split('=')[1]);
	});
});