export const runPromise = async (promise) => {
	try {
		const res = await promise;
		return [res, null];
	} catch (error) {
		return [undefined, error];
	}
};

export const iterate = (times) => (callback) => [...Array(times)].map((n, i) => callback(i));
