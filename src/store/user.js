import { writable } from 'svelte/store';
import { runPromise } from '@helpers';
import arcobaleno from '@api/arcobaleno';

async function fetchUser(session, set) {
	const [response, err] = await runPromise(arcobaleno(session).get(`/public/user`));
	if (err) {
		console.log('error when fetching user data');
	}

	set(response.data);
}

export default function user() {
	const { subscribe, set } = writable(undefined);
	return {
		subscribe,
		fetch: async (session) => {
			await fetchUser(session, set);
		},
	};
}
