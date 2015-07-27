'use strict';

function ajax (url, data, callback, type) {
	var data_array, data_string, idx, req, value;
	if (data == null) {
		data = {};
	}
	if (callback == null) {
		callback = function() {};
	}
	if (type == null) {
		//default to a GET request
		type = 'GET';
	}
	data_array = [];
	for (idx in data) {
		value = data[idx];
		data_array.push('' + idx + '=' + value);
	}
	data_string = data_array.join("&");
	req = new XMLHttpRequest();
	req.open(type, url, false);
	req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	req.onreadystatechange = function() {
		if (req.readyState === 4 && req.status === 200) {
			return callback(req.responseText);
		}
	};
	req.send(data_string);
	return req;
};

/**
 * Fetches products from the API, via an AJAX call.
 * @param {object} params - Forwarded in the web-service call. Can contain `sort`, `limit` and/or `skip`.
 * @param {function} callback - Function to call when response is received. First parameter contains array of products.
 */
function getProducts (params) {
	ajax(
		'/api',
		{
			sort: params.sort,
			limit: params.limit,
			skip: params.skip
		},
		function (data) {
			var products = data.split('\n')
				.filter(function (line) {
					return line;
				})
				.map(function (line) {
					return JSON.parse(line);
				});

			self.postMessage({ products: products });
		},
		'GET');
}

self.onmessage = function (e) {
	getProducts(e.data.params);
}