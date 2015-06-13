'use strict';

var React = require('../../../node_modules/react/react'),
	ProductRow = require('./productRow'),
	productsService = require('../services/productsService'),
	$ = require('../../../node_modules/npm-zepto/index'),
	utils = require('../utils'),
	Products = React.createClass({
		getInitialState: function () {
			return {
				params: {}
			};
		},
		isBusy: false,
		componentWillMount: function () {
			var that = this;
			window.addEventListener('scrollToBottom', function () {
				that.onMoreRowsNeeded(that.props.products.length + 5);
			});
		},		
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