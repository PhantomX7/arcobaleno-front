import { writable } from 'svelte/store';
import { runPromise } from '@helpers';
import arcobaleno from '@api/arcobaleno';
import moment from 'moment';

async function fetchCjkStory(session, set) {
	const [response, err] = await runPromise(
		arcobaleno(session).get(
			`/public/cjk-story?display_at=${moment().format('YYYY-MM-DD')},${moment().format('YYYY-MM-DD')}`,
		),
	);
	if (err) {
		console.log('error when fetching cjk story data');
	}

	set(response.data.data[0]);
}

export default function cjkStory() {
	const { subscribe, set } = writable(undefined);
	return {
		subscribe,
		fetch: async (session) => {
			await fetchCjkStory(session, set);
		},
	};
}
