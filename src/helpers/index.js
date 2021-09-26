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
	new Intl.NumberFormat('id', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
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
