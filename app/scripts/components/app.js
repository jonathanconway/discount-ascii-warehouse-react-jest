'use strict';

var React = require('react');
var ProductsTable = require('./productsTable');
var Advertisement = require('./advertisement');
var ScrollDetect = require('./scrollDetect');
var productsService = require('../services/productsService');

/** @constant {number} How many products to fetch each time more are needed. */
var FETCH_SIZE = 20;

/**
 * App
 *
 * @type ReactComponent
 * @description
 * 	Container of the entire app.
 */
var App = React.createClass({
	/** @return {object} */
	getInitialState: function () {
		return {
			/** Products on display. */
			products: [],
			
			/** Keep track whether we're loading data. */
			loading: true,

			/** Keep track of current filter field. */
			sortBy: '',

			/** Keep track of how many items should be displayed. */
			limit: FETCH_SIZE
		};
	},

	/** Retrieve products, then call updateProducts. */
	getProducts: function () {
		this.setState({ loading: true });
		productsService.getProducts(
			this.state.sortBy,
			this.state.limit,
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
		var that = this;
		this.setState({ sortBy: sortBy });
		setTimeout(function () {
			that.getProducts();
		});
	},

	/** Event handler triggered if user scrolls to bottom of window. */
	onScrollToBottom: function () {
		var that = this;
		this.setState({ limit: this.state.limit += FETCH_SIZE });
		setTimeout(function () {
			that.getProducts();
		});
	},

	/** @return {object} */
	render: function () {
		return <div className={this.state.loading ? 'loading' : ''}>

			<header>
				<h1>2Discount Ascii Warehouse</h1>

				<p>{'Here you\'re sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.'}</p>

				<p>But first, a word from our sponsors:</p>

				<Advertisement />
			</header>

			<ProductsTable
					products={this.state.products}
					onSort={this.onSort} />

			<ScrollDetect onScrollToBottom={this.onScrollToBottom} />
		</div>;
	}
});

module.exports = App;