'use strict';

jest.dontMock('../scrollDetect');

describe('scrollDetect', function() {
	var React = require('react/addons');
	var TestUtils = React.addons.TestUtils;
	var ScrollDetect = require('../scrollDetect');

	it('should add an event to the DOM, which fires on scrolling to bottom', function() {
		// Arrange
		var onScrollToBottom = jest.genMockFunction();
		var addEventListener = window.addEventListener = jest.genMockFunction();
		addEventListener.mockImplementation(function (eventName, fn) { fn(); });

		// Act
		var scrollDetectEl = TestUtils.renderIntoDocument(<ScrollDetect onScrollToBottom={onScrollToBottom} />);

		// Verify
		expect(addEventListener.mock.calls.length).toBe(2);
		expect(onScrollToBottom.mock.calls.length).toBe(1);
	});
});