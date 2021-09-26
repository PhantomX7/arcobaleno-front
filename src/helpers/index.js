import queryString from 'query-string';
import _ from 'lodash';

export const runPromise = async (promise) => {
	try {
		const res = await promise;
		return [res, null];
	} catch (error) {
		return [undefined, error];
	}
};

export const iterate = (times) => (callback) => [...Array(times)].map((n, i) => callback(i));

export const formatNumber = (number) =>
	new Intl.NumberFormat('id', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(
		number,
	);

export const clickOutside = function (element, callbackFunction) {
	function onClick(event) {
		if (!element.contains(event.target)) {
			callbackFunction();
		}
	}

	document.body.addEventListener('click', onClick);

	return {
		update(newCallbackFunction) {
			callbackFunction = newCallbackFunction;
		},
		destroy() {
			document.body.removeEventListener('click', onClick);
		},
	};
};

export function generatePaginationUrl(url, page, limit, query) {
	if (query.page) {
		// eslint-disable-next-line no-unused-vars
		let { page, ...otherQuery } = query;
		query = { ...otherQuery };
	}
	if (query.limit) {
		// eslint-disable-next-line no-unused-vars
		let { limit, ...otherQuery } = query;
		query = { ...otherQuery };
	}
	return `${url}?limit=${limit}&page=${parseInt(page)}${
		_.isEmpty(query) || JSON.stringify(query) == '{}' ? '' : `&` + queryString.stringify(query)
	}`;
}

export function generateIndexUrl(path, query = {}) {
	let currentPage = 1;
	let currentLimit = 20;
	if (query.page) {
		currentPage = query.page;
		// eslint-disable-next-line no-unused-vars
		let { page, ...otherQuery } = query;
		query = { ...otherQuery };
	}
	if (query.limit) {
		currentLimit = query.limit;
		// eslint-disable-next-line no-unused-vars
		let { limit, ...otherQuery } = query;
		query = { ...otherQuery };
	}

	return `${path}?limit=${currentLimit}&offset=${(currentPage - 1) * currentLimit}${
		Object.keys(query).length > 0 ? `&` + queryString.stringify(query) : ''
	}`;
}
