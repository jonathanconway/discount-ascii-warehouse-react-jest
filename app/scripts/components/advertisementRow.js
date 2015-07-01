'use strict';

var React = require('react');
var Advertisement = require('./advertisement');

/**
 * AdvertisementRow
 *
 * @type ReactComponent
 * @description
 * 	A table row representing an advertisement.
 */
var AdvertisementRow = React.createClass({
	/** @return {object} */
	render: function () {
		return <tr>
			<td colSpan="4">
				<Advertisement />
			</td>
		</tr>;
	}
});

module.exports = AdvertisementRow;