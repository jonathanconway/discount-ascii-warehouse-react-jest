'use strict';

var React = require('../../../node_modules/react/react'),
	ProductRow = require('./productRow'),
	productsService = require('../services/productsService'),
	$ = require('../../../node_modules/npm-zepto/index'),
	Products = React.createClass({
		getInitialState: function () {
			return {
				params: {}
			};
		},
		isBusy: false,
		onHeaderClick: function (e) {
			if (this.props.onSort && !(this.isBusy)) {
				this.isBusy = true;
				this.props.onSort(e.target.innerText.toLowerCase());
			}
		},
		onMoreRowsNeeded: function (totalNumberOfRowsToLoad) {
			if (this.props.onMoreRowsNeeded && !(this.isBusy)) {
				this.isBusy = true;
				this.props.onMoreRowsNeeded(totalNumberOfRowsToLoad);
			}
		},
		componentDidUpdate: function () {
			this.isBusy = false;
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