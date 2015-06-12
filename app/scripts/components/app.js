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
			productsService(criteria, function (products) {
				that.products = products;
				that.setState(criteria);
			});
		},
		componentDidMount: function () {
			this.updateProducts({});
		},
		onSort: function (sort) {
			this.updateProducts({ sort: sort });
		},
		render: function () {
			return <ProductsTable products={this.products} onSort={this.onSort} sortColumn={this.state.sort} />;
		}
	});

module.exports = App;