'use strict';

var React = require('../../../node_modules/react/react');

var Advertisement = require('./advertisement');

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