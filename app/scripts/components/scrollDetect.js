'use strict';

var React = require('react');
var $ = require('npm-zepto');

/**
 * Sets up a DOM event which triggers every time the user scrolls to the bottom of the viewport.
 */
function createScrollToBottomEvent() {
	$.Event('scrollToBottom');
	window.addEventListener('scroll', function () {
		if (($('body').height() - window.scrollY) < window.innerHeight) {
			$(window).trigger('scrollToBottom');
		}
	});
}

createScrollToBottomEvent();

/**
 * ScrollDetect
 *
 * @type ReactComponent
 * @description
 * 	Detects user scrolling to bottom of viewport and raises and event when this happens.
 */
var ScrollDetect = React.createClass({
	componentWillMount: function () {
		var that = this;
		window.addEventListener('scrollToBottom', function () {
			that.props.onScrollToBottom();
		});
	},		

	/** @return {object} */
	render: function () {
		return <span></span>;
	}
});

module.exports = ScrollDetect;