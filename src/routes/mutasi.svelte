<script context="module">
	export async function load({ session, page }) {
		if (!session.authenticated) {
			console.log('here');

			return {
				status: 301,
				redirect: '/',
			};
		}

		let mutation = { data: [], meta: {} };

		let [response, err] = await runPromise(
			arcobaleno(session).get(
				generateIndexUrl(`/public/wallet-mutation`, queryString.parse(page.query.toString())),
			),
		);
		if (err) {
			console.log('error when fetching transaksi data');
			return {
				status: 200,
				props: {
					mutation,
				},
			};
		}

		mutation = response.data;

		return {
			status: 200,
			props: {
				mutation,
			},
		};
	}
</script>

<script>
	import { page } from '$app/stores';
	import queryString from 'query-string';

	import arcobaleno from '@api/arcobaleno';

	import ListTable from '@components/Mutation/ListTable.svelte';
	import Pagination from '@components/Pagination.svelte';

	import { runPromise, generateIndexUrl } from '@helpers';

	export let mutation = { data: [], meta: {} };
</script>

<svelte:head>
	<title>Transaksi Capjikia</title>
</svelte:head>

<section class="container p-6 py-12 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
	<div class="mt-10 md:flex md:items-center md:justify-between">
		<div class="flex-1 min-w-0">
			<h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Mutasi Saldo</h2>
		</div>

		<div class="mt-4 flex md:mt-0 md:ml-4">
			<!-- <Button fullWidth={false} type="submit" on:click={showNewTransaksi}>Transaksi Baru</Button> -->
		</div>
	</div>
	<div class="my-8">
		<ListTable data={mutation.data} />
		<Pagination
			meta={mutation.meta}
			query={queryString.parse($page.query.toString())}
			url="mutasi"
		/>
	</div>
</section>
