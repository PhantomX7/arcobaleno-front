import axios from 'axios';
import { runPromise } from '@helpers';
import { URL } from '@env';

export async function post(req) {
	const [response, err] = await runPromise(
		axios.post(`${URL}/public/auth/signup`, {
			...req.body,
		}),
	);

	if (err) {
		return {
			status: err.response.status,
			body: err.response.data,
		};
	}

	req.locals.user = JSON.stringify({
		token: response.data.token,
		authenticated: true,
	});

	return {
		status: 200,
		body: response.data,
	};
}
