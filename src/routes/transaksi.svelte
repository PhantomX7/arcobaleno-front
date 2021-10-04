<script context="module">
	export async function load({ session, page }) {
		if (!session.authenticated) {
			console.log('here');

			return {
				status: 301,
				redirect: '/',
			};
		}

		let transaction = { data: [], meta: {} };
		let total = 0;

		let [response, err] = await runPromise(
			arcobaleno(session).get(
				generateIndexUrl(`/public/cjk-transaction`, queryString.parse(page.query.toString())),
			),
		);
		if (err) {
			console.log('error when fetching transaksi data');
			return {
				status: 200,
				props: {
					transaction,
					total,
				},
			};
		}

		transaction = response.data;

		[response, err] = await runPromise(arcobaleno(session).get('/public/cjk-transaction/total'));
		if (err) {
			console.log('error when fetching transaksi data');
			return {
				status: 200,
				props: {
					transaction,
					total,
				},
			};
		}

		total = response.data;

		return {
			status: 200,
			props: {
				transaction,
				total,
			},
		};
	}
</script>

<script>
	import { page } from '$app/stores';
	import queryString from 'query-string';

	import arcobaleno from '@api/arcobaleno';

	import ListTable from '@components/Transaction/ListTable.svelte';
	import Pagination from '@components/Pagination.svelte';

	import { runPromise, generateIndexUrl, formatNumber } from '@helpers';

	export let transaction = { data: [], meta: {} };
	export let total = 0;
</script>

<svelte:head>
	<title>Transaksi Capjikia</title>
</svelte:head>

<section class="container p-6 py-12 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
	<div class="mt-10 md:flex md:items-center md:justify-between">
		<div class="flex-1 min-w-0">
			<h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Transaksi</h2>
		</div>

		<div class="mt-4 flex md:mt-0 md:ml-4">
			<!-- <Button fullWidth={false} type="submit" on:click={showNewTransaksi}>Transaksi Baru</Button> -->
		</div>
	</div>
	<div class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6 max-w-md">
		<dt class="text-md font-medium text-gray-500 truncate">Total Keuntungan</dt>
		<dd class="mt-1 text-3xl font-semibold text-green-500">Rp {formatNumber(total)}</dd>
	</div>
	<div class="my-8">
		<ListTable data={transaction.data} />
		<Pagination
			meta={transaction.meta}
			query={queryString.parse($page.query.toString())}
			url="transaksi"
		/>
	</div>
</section>
