'use strict';

var React = require('../../../node_modules/react/react');
var ProductRow = require('./productRow');
var productsService = require('../services/productsService');
var $ = require('../../../node_modules/npm-zepto/index');
var utils = require('../utils');
var Products = React.createClass({
	getInitialState: function () {
		return {
			params: {}
		};
	},

	componentWillMount: function () {
		var that = this;
		window.addEventListener('scrollToBottom', function () {
			that.onMoreRowsNeeded();
		});
	},		

	/** Event handler triggered if user clicks a column header. */
	onHeaderClick: function (e) {
		this.props.onSort(e.target.innerText.toLowerCase());
	},

	/** Event handler triggered if user scrolls to bottom of window. */
	onMoreRowsNeeded: function () {
		this.props.onMoreRowsNeeded(this.props.products.length + 5);
	},

	/** @return {object} */
	render: function () {
		return <table>
			<thead>
				<tr>
					<th onClick={this.onHeaderClick}>Id</th>
					<th onClick={this.onHeaderClick}>Item</th>
					<th onClick={this.onHeaderClick}>Size</th>
					<th onClick={this.onHeaderClick}>Price</th>
				</tr>
			</thead>
			<tbody>
				{this.props.products.map(function (product) {
					return <ProductRow key={product.id} product={product} />;
				})}
				{this.props.products.length === 0 ?
					<tr>
						<td colSpan="4">
							No products found.
						</td>
					</tr>
				: ''}
			</tbody>
		</table>;
	}
});

module.exports = Products;