'use strict';

var React = require('../../../node_modules/react/react'),
	ProductsTable = require('./productsTable'),
	productsService = require('../services/productsService'),
	App = React.createClass({
		getInitialState: function () {
			return {
				sort: ''
			};
		},
		products: [],
		updateProducts: function (criteria) {
			var that = this;

			productsService.get(criteria)
				.then(function (products) {
					that.products = products;
					that.setState(criteria);
				});
		},
		componentDidMount: function () {
			this.updateProducts({ limit: 20 });
		},
		onSort: function (sort) {
			this.updateProducts({ sort: sort });
		},
		onMoreRowsNeeded: function (totalNumberOfRowsToLoad) {
			this.updateProducts({ limit: totalNumberOfRowsToLoad });
		},
		render: function () {
			return <ProductsTable
						products={this.products}
						onSort={this.onSort}
						sortColumn={this.state.sort}
						onMoreRowsNeeded={this.onMoreRowsNeeded} />;
		}
	});

module.exports = App;