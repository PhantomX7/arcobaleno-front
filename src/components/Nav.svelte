<script>
	import { goto } from '$app/navigation';
	import { session, page } from '$app/stores';
	import { getContext } from 'svelte';
	import axios from 'axios';

	import { user } from '@store';

	import Login from '@components/Auth/Login.svelte';
	import Button from '@components/Button.svelte';
	import Spinner from '@components/Spinner.svelte';
	import { runPromise, formatNumber, clickOutside } from '@helpers';

	const { open } = getContext('simple-modal');
	const showLogin = () => {
		open(Login, {});
	};
	let openMenu = false;
</script>

<nav class="bg-white shadow fixed w-full z-10">
	<div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
		<div class="relative flex justify-between h-16">
			<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
				<!-- Mobile menu button -->
				<button
					type="button"
					class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
					aria-controls="mobile-menu"
					aria-expanded="false"
					on:click={() => {
						openMenu = !openMenu;
					}}
				>
					<span class="sr-only">Open main menu</span>
					<!--
						Icon when menu is closed.
			
						Heroicon name: outline/menu
			
						Menu open: "hidden", Menu closed: "block"
					-->
					<svg
						class="block h-6 w-6 {openMenu ? 'hidden' : 'block'}"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
					<!--
						Icon when menu is open.
			
						Heroicon name: outline/x
			
						Menu open: "block", Menu closed: "hidden"
					-->
					<svg
						class="h-6 w-6 {openMenu ? 'block' : 'hidden'}"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
			<div class="flex-1 flex ml-11 sm:items-stretch sm:justify-start sm:ml-0">
				<div class="flex-shrink-0 flex items-center text-2xl">
					<a href="/">Capjikia</a>
				</div>
				<div class="hidden sm:ml-6 sm:flex sm:space-x-8">
					<!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
					<a
						href="/"
						class="{$page.path == '/'
							? 'border-red-400 text-red-400'
							: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
					>
						Dashboard
					</a>
					<a
						href="/beli"
						class="{$page.path == '/beli'
							? 'border-red-400 text-red-400'
							: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
					>
						Beli
					</a>
					{#if $session.authenticated}
						<a
							href="transaksi"
							class="{$page.path == '/transaksi'
								? 'border-red-400 text-red-400'
								: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
						>
							Transksi
						</a>
						<a
							href="/riwayat"
							class="{$page.path == '/riwayat'
								? 'border-red-400 text-red-400'
								: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
						>
							Riwayat
						</a>
						<a
							href="/deposit"
							class="{$page.path == '/deposit'
								? 'border-red-400 text-red-400'
								: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
						>
							Deposit
						</a>
						<a
							href="/mutasi"
							class="{$page.path == '/mutasi'
								? 'border-red-400 text-red-400'
								: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
						>
							Mutasi
						</a>
						<a
							href="/withdraw"
							class="{$page.path == '/withdraw'
								? 'border-red-400 text-red-400'
								: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
						>
							Withdraw
						</a>
						<a
							href="/profil"
							class="{$page.path.split('/')[1] == 'profil'
								? 'border-red-400 text-red-400'
								: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
						>
							Profil
						</a>
					{/if}
				</div>
			</div>
			<div
				class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
			>
				{#if !$session.authenticated}
					<Button className="mr-3" on:click={() => goto('/daftar')}>Daftar</Button>
					<Button className="" on:click={showLogin}>Masuk</Button>
				{:else}
					{#if $user}
						<div class="mr-4 relative">
							<button
								class="justify-center inline-flex items-center px-3.5 py-2 shadow border-b border-gray-200 border border-transparent text-sm leading-4 font-medium rounded-full bg-white hover:bg-gray-100"
							>
								Saldo : Rp {formatNumber($user.wallet.amount)}
							</button>
						</div>
					{:else}
						<button
							class="justify-center mr-3 inline-flex items-center px-3.5 py-2 shadow border-b border-gray-200 border border-transparent text-sm leading-4 font-medium rounded-full bg-white hover:bg-gray-100"
						>
							<Spinner color="#000" />
						</button>
					{/if}
					<Button
						className="hidden sm:block mr-3"
						on:click={async () => {
							await runPromise(axios.post(`api/signout`));

							$session.token = '';
							$session.authenticated = false;
						}}>Keluar</Button
					>
				{/if}
			</div>
		</div>
	</div>

	<!-- Mobile menu, show/hide based on menu state. -->
	<div class="sm:hidden {openMenu ? 'block' : 'hidden'}" id="mobile-menu">
		<div class="pt-2 pb-4 space-y-1">
			<!-- Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" -->
			<a
				on:click={() => {
					openMenu = !openMenu;
				}}
				href="/"
				class="{$page.path == '/'
					? 'bg-red-50 border-red-400 text-red-700'
					: 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'}  block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
				>Dashboard</a
			>
			<a
				on:click={() => {
					openMenu = !openMenu;
				}}
				href="/beli"
				class="{$page.path == '/beli'
					? 'bg-red-50 border-red-400 text-red-700'
					: 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
				>Beli</a
			>
			<a
				on:click={() => {
					openMenu = !openMenu;
				}}
				href="/deposit"
				class="{$page.path == '/deposit'
					? 'bg-red-50 border-red-400 text-red-700'
					: 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
				>Deposit</a
			>
			<a
				on:click={() => {
					openMenu = !openMenu;
				}}
				href="/mutasi"
				class="{$page.path == '/mutasi'
					? 'bg-red-50 border-red-400 text-red-700'
					: 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
				>Mutasi</a
			>
			<a
				on:click={() => {
					openMenu = !openMenu;
				}}
				href="/withdraw"
				class="{$page.path == '/withdraw'
					? 'bg-red-50 border-red-400 text-red-700'
					: 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
				>Withdraw</a
			>
			<a
				on:click={() => {
					openMenu = !openMenu;
				}}
				href="/transaksi"
				class="{$page.path == '/transaksi'
					? 'bg-red-50 border-red-400 text-red-700'
					: 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
				>Transaksi</a
			>
			<a
				on:click={() => {
					openMenu = !openMenu;
				}}
				href="/riwayat"
				class="{$page.path == '/riwayat'
					? 'bg-red-50 border-red-400 text-red-700'
					: 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
				>Riwayat</a
			>
			<a
				on:click={() => {
					openMenu = !openMenu;
				}}
				href="/profil"
				class="{$page.path == '/profil'
					? 'bg-red-50 border-red-400 text-red-700'
					: 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
				>Profil</a
			>
			<a
				on:click={() => {
					openMenu = !openMenu;
				}}
				href="/"
				on:click={async () => {
					await runPromise(axios.post(`api/signout`));

					$session.token = '';
					$session.authenticated = false;
				}}
				class="{$page.path == '/keluar'
					? 'bg-red-50 border-red-400 text-red-700'
					: 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
				>Keluar</a
			>
		</div>
	</div>
</nav>
