'use strict';

/** @constant {number} How many products to fetch each time more are needed. */
var FETCH_SIZE = 20;

var React = require('../../../node_modules/react/react');
var ProductsTable = require('./productsTable');
var productsService = require('../services/productsService');

var App = React.createClass({
	getInitialState: function () {
		return {
			advertisementImage: '/ad/?r=' + Math.floor(Math.random()*1000),

			products: [],
			loading: true,
		};
	},

	/** Keep track of current filter field. */
	sortBy: '',

	/** Keep track of how many items should be displayed. */
	limit: FETCH_SIZE,

	/** Retrieve products, then call updateProducts. */
	getProducts: function () {
		this.setState({ loading: true });
		productsService.getProducts(
			this.sortBy,
			this.limit,
			this.updateProducts);
	},

	/**
	 * Update state to a different set of products.
	 * @param {array} products - Products to update to.
	 */
	updateProducts: function (products) {
		this.setState({ products: products, loading: false });
	},

	componentDidMount: function () {
		productsService = productsService.init({ prefetchSize: FETCH_SIZE });
		this.getProducts();
	},

	/**
	 * Event handler called within ProductTable.
	 * @param {string} - Name of field to sort by.
	 */
	onSort: function (sortBy) {
		this.sortBy = sortBy;
		this.getProducts();
	},

	/** Event handler called within ProductTable. */
	onMoreRowsNeeded: function () {
		this.limit += FETCH_SIZE;
		this.getProducts();
	},

	/** @return {object} */
	render: function () {
		return <div className={this.state.loading ? 'loading' : ''}>

			<header>
				<h1>Discount Ascii Warehouse</h1>

				<p>{'Here you\'re sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.'}</p>

				<p>But first, a word from our sponsors:</p>

				<img className="ad" src={this.state.advertisementImage} />
			</header>

			<ProductsTable
					products={this.state.products}
					onSort={this.onSort}
					onMoreRowsNeeded={this.onMoreRowsNeeded} />
		</div>;
	}
});

module.exports = App;