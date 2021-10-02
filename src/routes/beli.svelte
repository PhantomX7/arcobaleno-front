<script>
	import { getContext } from 'svelte';
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';

	import Button from '@components/Button.svelte';
	import Login from '@components/Auth/Login.svelte';
	import Bet from '@components/Dashboard/Bet.svelte';
	import BetTutorial from '@components/Dashboard/BetTutorial.svelte';

	const { open } = getContext('simple-modal');
</script>

<svelte:head>
	<title>Withdraw Capjikia</title>
</svelte:head>
<section class="bg-white border-b py-8">
	<div class="container max-w-5xl mx-auto m-8 mt-16">
		<h1 class="w-full my-2 text-2xl sm:text-4xl font-bold leading-tight text-center text-gray-800">
			Pembelian Kontrak
		</h1>
	</div>
	<div class="w-full mb-4">
		<div class="h-1 mx-auto bg-red-400 w-64 opacity-25 my-0 py-0 rounded-t" />
	</div>
	<div
		class="container pt-8 px-5 mx-auto flex flex-wrap flex-col md:flex-row items-center justify-center"
	>
		<h2>
			Dapatkan 12x dari nilai kontrak apa bila sesuai dengan prediksi <strong
				>(Biaya admin 5% untuk setiap kontrak yang dimenangkan)</strong
			>
		</h2>
	</div>
	<div
		class="container px-5 mx-auto flex flex-wrap flex-col md:flex-row items-center justify-center"
	>
		<h2>Berikut merupakan cara pembelian kontrak:</h2>
	</div>
	<div
		class="container py-8 px-5 mx-auto flex flex-wrap flex-col md:flex-row items-center justify-center"
	>
		<div class="max-w-sm">
			<BetTutorial />
		</div>
	</div>
	<div
		class="container py-8 px-5 mx-auto flex flex-wrap flex-col md:flex-row items-center justify-center"
	>
		{#if !$session.authenticated}
			Klik tombol
			<Button className="mx-2" on:click={() => goto('/daftar')}>Daftar</Button>
			atau
			<Button className="mx-2" on:click={() => open(Login, {})}>Masuk</Button>
			untuk melanjutkan
		{:else}
			<div>
				<Bet />
			</div>
		{/if}
	</div>
</section>
