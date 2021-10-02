<script context="module">
	export async function load({ session, page }) {
		if (!session.authenticated) {
			return {
				status: 301,
				redirect: '/',
			};
		}

		let history = { data: [], meta: {} };
		let n = 1;

		if (page.query.get('page')) {
			n = parseInt(page.query.get('page'));
			console.log(7 * n - 1);
			console.log(7 * (n - 1));
		}
		let [response, err] = await runPromise(
			arcobaleno(session).get(
				`/public/cjk-result?created_at=${moment()
					.subtract(7 * n - 1, 'days')
					.format('YYYY-MM-DD')},${moment()
					.subtract(7 * (n - 1), 'days')
					.format('YYYY-MM-DD')}&sort=created_at%20desc&limit=100`,
			),
		);
		console.log(err);
		console.log(response.data);
		if (err) {
			console.log('error when fetching history data');
			return {
				status: 200,
				props: {
					history,
				},
			};
		}

		history = response.data;

		return {
			status: 200,
			props: {
				history,
			},
		};
	}
</script>

<script>
	import moment from 'moment';
	import { page } from '$app/stores';
	import { getContext } from 'svelte';
	import queryString from 'query-string';

	import arcobaleno from '@api/arcobaleno';

	import ResultTable from '@components/ResultTable.svelte';
	import Pagination from '@components/History/Pagination.svelte';

	import { runPromise } from '@helpers';

	const { open } = getContext('simple-modal');
	// const showNewWithdraw = () => {

	// };

	export let history;
</script>

<svelte:head>
	<title>Riwayat Capjikia</title>
</svelte:head>

<section class="container p-6 py-12 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
	<div class="mt-10 md:flex md:items-center md:justify-between">
		<div class="flex-1 min-w-0">
			<h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">History</h2>
		</div>
	</div>
	<div class="my-8">
		<ResultTable data={history.data} />
		<Pagination stopNext={history.data.length == 0} query={queryString.parse($page.query.toString())} url="riwayat" />
	</div>
</section>
