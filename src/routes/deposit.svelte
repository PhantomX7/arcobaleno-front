<script context="module">
	export async function load({ session, page }) {
		if (!session.authenticated) {
			return {
				status: 301,
				redirect: '/',
			};
		}

		let deposit = { data: [], meta: {} };

		session.refreshDeposit = false;
		const [response, err] = await runPromise(
			arcobaleno(session).get(
				generateIndexUrl(`/public/deposit-confirmation`, queryString.parse(page.query.toString())),
			),
		);
		if (err) {
			console.log('error when fetching deposit data');
			return {
				status: 200,
				props: {
					deposit,
				},
			};
		}

		deposit = response.data;

		return {
			status: 200,
			props: {
				deposit,
			},
		};
	}
</script>

<script>
	import { page } from '$app/stores';
	import { getContext } from 'svelte';
	import queryString from 'query-string';

	import arcobaleno from '@api/arcobaleno';

	import NewDepositModal from '@components/Deposit/NewDepositModal.svelte';
	import ListTable from '@components/Deposit/ListTable.svelte';
	import Button from '@components/Button.svelte';
	import Pagination from '@components/Pagination.svelte';

	import { runPromise, generateIndexUrl } from '@helpers';

	const { open } = getContext('simple-modal');
	const showNewDeposit = () => {
		open(NewDepositModal, {});
	};

	export let deposit;
</script>

<svelte:head>
	<title>Deposit Capjikia</title>
</svelte:head>

<section class="container p-6 py-12 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
	<div class="mt-10 md:flex md:items-center md:justify-between">
		<div class="flex-1 min-w-0">
			<h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Deposit</h2>
		</div>
		<div class="mt-4 flex md:mt-0 md:ml-4">
			<Button fullWidth={false} type="submit" on:click={showNewDeposit}>Deposit Baru</Button>
		</div>
	</div>
	<div class="my-8">
		<ListTable data={deposit.data} />
		<Pagination
			meta={deposit.meta}
			query={queryString.parse($page.query.toString())}
			url="deposit"
		/>
	</div>
</section>
