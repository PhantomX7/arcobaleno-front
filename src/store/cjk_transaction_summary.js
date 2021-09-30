import { writable } from 'svelte/store';
import { runPromise } from '@helpers';
import arcobaleno from '@api/arcobaleno';

async function fetchCjkTransactionSummary(session, set) {
	const [response, err] = await runPromise(arcobaleno(session).get(`/public/cjk-transaction/summary`));
	if (err) {
		console.log('error when fetching cjktransaction data');
	}

	set(response.data);
}

export default function cjkTransactionSummary() {
	const { subscribe, set } = writable(undefined);
	return {
		subscribe,
		fetch: async (session) => {
			await fetchCjkTransactionSummary(session, set);
		},
	};
}
