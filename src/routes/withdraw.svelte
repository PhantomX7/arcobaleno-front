<script context="module">
	export async function load({ session, page }) {
		if (!session.authenticated) {
			return {
				status: 301,
				redirect: '/',
			};
		}

		let withdraw = { data: [], meta: {} };

		const [response, err] = await runPromise(
			arcobaleno(session).get(
				generateIndexUrl(`/public/withdraw-request`, queryString.parse(page.query.toString())),
			),
		);
		if (err) {
			console.log('error when fetching withdraw data');
			return {
				status: 200,
				props: {
					withdraw,
				},
			};
		}

		withdraw = response.data;

		return {
			status: 200,
			props: {
				withdraw,
			},
		};
	}
</script>

<script>
	import { page } from '$app/stores';
	import { getContext } from 'svelte';
	import queryString from 'query-string';

	import arcobaleno from '@api/arcobaleno';

	import ListTable from '@components/Withdraw/ListTable.svelte';
	import NewWithdrawModal from '@components/Withdraw/NewWithdrawModal.svelte';
	import Button from '@components/Button.svelte';
	import Pagination from '@components/Pagination.svelte';

	import { runPromise, generateIndexUrl } from '@helpers';

	const { open } = getContext('simple-modal');

	export let withdraw;
</script>

<svelte:head>
	<title>Withdraw Capjikia</title>
</svelte:head>

<section class="container p-6 py-12 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
	<div class="mt-10 md:flex md:items-center md:justify-between">
		<div class="flex-1 min-w-0">
			<h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Withdraw</h2>
		</div>
		<div class="mt-4 flex md:mt-0 md:ml-4">
			<Button fullWidth={false} type="submit" on:click={() => {open(NewWithdrawModal, {});}}>Withdraw Baru</Button>
		</div>
	</div>
	<div class="my-8">
		<ListTable data={withdraw.data} />
		<Pagination
			meta={withdraw.meta}
			query={queryString.parse($page.query.toString())}
			url="withdraw"
		/>
	</div>
</section>
