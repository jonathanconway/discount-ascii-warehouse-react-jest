'use strict';

var React = require('../../node_modules/react/react'),
	App = require('./components/app');

// Activate the App component, containing all other components.
React.render(React.createElement(App, null), document.body);