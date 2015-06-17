'use strict';

var $ = require('../../node_modules/npm-zepto/index');

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