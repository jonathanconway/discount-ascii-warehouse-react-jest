'use strict';

var React = require('../../../node_modules/react/react'),
	ProductRow = require('./productRow'),
	productsService = require('../services/productsService'),
	Products = React.createClass({
		getInitialState: function () {
			return {
				params: {}
			};
		},
		onHeaderClick: function (e) {
			this.props.onSort(e.target.innerText.toLowerCase());
		},
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
						return <ProductRow product={product} />;
					})}
					{this.props.products.length === 0 ?
						<tr>
							<td colspan="4">
								No products found.
							</td>
						</tr>
					: ''}
				</tbody>
			</table>;
		}
	});

module.exports = Products;