'use strict';

var FETCH_SIZE = 20,

	React = require('../../../node_modules/react/react'),
	ProductsTable = require('./productsTable'),
	productsService = require('../services/productsService'),

	App = React.createClass({
		getInitialState: function () {
			return {
				products: [],
			};
		},
		sortBy: '',
		limit: FETCH_SIZE,
		getProducts: function () {
			productsService.getProducts(
				this.sortBy,
				this.limit,
				this.updateProducts);
		},
		updateProducts: function (products) {
			this.setState({ products: products });
		},
		componentDidMount: function () {
			productsService = productsService.init({ prefetchSize: FETCH_SIZE });
			this.getProducts();
		},
		onSort: function (sortBy) {
			this.sortBy = sortBy;
			this.getProducts();
		},
		onMoreRowsNeeded: function () {
			this.limit += FETCH_SIZE;
			this.getProducts();
		},
		render: function () {
			return <ProductsTable
						products={this.state.products}
						onSort={this.onSort}
						onMoreRowsNeeded={this.onMoreRowsNeeded} />;
		}
	});

module.exports = App;