'use strict';

var $ = require('../../node_modules/npm-zepto/index');

function createScrollToBottomEvent() {
	$.Event('scrollToBottom');
	window.addEventListener('scroll', function () {
		if (($('body').height() - window.scrollY) < window.innerHeight) {
			$(window).trigger('scrollToBottom');
		}
	});
}

createScrollToBottomEvent();