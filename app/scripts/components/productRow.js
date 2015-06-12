'use strict';

var React = require('../../../node_modules/react/react'),
	accounting = require('../../../node_modules/accounting/accounting.js'),
	ProductRow = React.createClass({
		render: function () {
			return <tr>
				<td>{this.props.product.id}3</td>
				<td>{this.props.product.face}</td>
				<td style={{ fontSize: this.props.product.size }}>{this.props.product.size}</td>
				<td>{accounting.formatMoney(this.props.product.price)}</td>
			</tr>;
		}
	});

module.exports = ProductRow;