'use strict';

var React = require('../../../node_modules/react/react');

var randomNumberLog = [];

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
			imageUrl: this.generateImageUrl()
		};
	},

	generateImageUrl: function () {
		var randomNumber = Math.floor(Math.random() * 1000);
		if (randomNumberLog.indexOf(randomNumber) > -1) {
			return this.generateImageUrl();
		}
		randomNumberLog.push(randomNumber);
		return '/ad/?r=' + randomNumber;
	},

	/** @return {object} */
	render: function () {
		return <img className="ad" src={this.state.imageUrl} />;
	}
});

module.exports = Advertisement;