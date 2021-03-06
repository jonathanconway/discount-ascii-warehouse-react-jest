'use strict';

var React = require('react');
var ProductRow = require('./productRow');
var AdvertisementRow = require('./advertisementRow');
var productsService = require('../services/productsService');

/**
 * Products
 *
 * @type ReactComponent
 * @description
 * 	A table of products.
 */
var Products = React.createClass({
	/** @return {object} */
	getInitialState: function () {
		return {
			params: {}
		};
	},

	/** Event handler triggered if user clicks a column header. */
	onHeaderClick: function (e) {
		this.props.onSort(e.target.innerText.toLowerCase());
	},

	/** @return {object} */
	render: function () {
		var rows = [];
		this.props.products.forEach(function (product, index) {
			// Insert product
			rows.push(<ProductRow key={product.id} product={product} />);

			// After every 20th row, insert an Advertisement
			if (((index + 1) % 20) === 0) {
				rows.push(<AdvertisementRow key={index} />);
			}
		});

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
				{rows}

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