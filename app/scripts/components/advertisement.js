'use strict';

var React = require('react');

/**
 * Advertisement
 *
 * @type ReactComponent
 * @description
 * 	An advertisement, selected at random, never duplicated.
 */
var Advertisement = React.createClass({
	getInitialState: function () {
		return {
			/** Generate image src, including random parameter */
			imageUrl: '/ad/?r=' + Math.floor(Math.random(new Date().getTime()) * 10000)
		};
	},

	/** @return {object} */
	render: function () {
		return <img className="ad" src={this.state.imageUrl} />;
	}
});

module.exports = Advertisement;