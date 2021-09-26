<script context="module">
	export async function load({ session }) {
		if (!session.authenticated) {
			return {
				status: 301,
				redirect: '/',
			};
		}
		return {
			status: 200,
		};
	}
</script>

<script>
	import { session } from '$app/stores';
	import { browser } from '$app/env';
	import { getContext } from 'svelte';

	import arcobaleno from '@api/arcobaleno';

	import NewDepositModal from '@components/Deposit/NewDepositModal.svelte';
	import ListTable from '@components/Deposit/ListTable.svelte';
	import Button from '@components/Button.svelte';

	import { runPromise } from '@helpers';

	const { open } = getContext('simple-modal');
	const showNewDeposit = () => {
		open(NewDepositModal, {});
	};

	if (browser) {
		$session.refreshDeposit = true;
	}

	let deposit = [];

	$: if (browser && $session.refreshDeposit) {
		$session.refreshDeposit = false;
		(async function () {
			const [response, err] = await runPromise(
				arcobaleno($session).get(`/public/deposit-confirmation`),
			);
			if (err) {
				console.log('error when fetching user data');
			}
			deposit = response.data;
		})();
	}
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
	</div>
</section>
