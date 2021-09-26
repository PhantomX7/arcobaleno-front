export async function post(req) {
	req.locals.user = JSON.stringify({
		token: '',
		authenticated: false,
	});

	return {
		status: 200,
		body: 'ok',
	};
}
