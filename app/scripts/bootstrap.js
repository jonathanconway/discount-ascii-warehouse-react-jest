'use strict';

var React = require('react'),
	App = require('./components/app');

// Activate the App component, containing all other components.
React.render(React.createElement(App, null), document.body);