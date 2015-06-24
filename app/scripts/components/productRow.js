'use strict';

var React = require('../../../node_modules/react/react');
var accounting = require('../../../node_modules/accounting/accounting.js');
var ProductRow = React.createClass({
	/** @return {object} */
	render: function () {
		return <tr>
			<td>{this.props.product.id}</td>
			<td>{this.props.product.face}</td>
			<td style={{ fontSize: this.props.product.size }}>{this.props.product.size}</td>
			<td>{accounting.formatMoney(this.props.product.price)}</td>
		</tr>;
	}
});

module.exports = ProductRow;