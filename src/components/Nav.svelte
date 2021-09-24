<script>
	import { goto } from '$app/navigation';
	import { getContext } from 'svelte';
	import Login from '@components/Auth/Login.svelte';
	const { open } = getContext('simple-modal');
	const showLogin = () => {
		open(Login, {});
	};
	let openMenu = false;
</script>

<nav class="bg-white shadow fixed w-full z-50">
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
			<div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
				<div class="flex-shrink-0 flex items-center text-2xl">Capjikia</div>
				<div class="hidden sm:ml-6 sm:flex sm:space-x-8">
					<!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
					<a
						href="#"
						class="border-red-400 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
					>
						Dashboard
					</a>
					<!-- <a
						href="#"
						class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
					>
						Team
					</a>
					<a
						href="#"
						class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
					>
						Projects
					</a>
					<a
						href="#"
						class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
					>
						Calendar
					</a> -->
				</div>
			</div>
			<div
				class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
			>
				<button
					type="button"
					on:click={() => goto('/daftar')}
					class="mr-5 inline-flex items-center px-3.5 py-2 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm text-white bg-red-400 hover:bg-red-500"
				>
					Daftar
				</button>
				<button
					type="button"
					on:click={showLogin}
					class="inline-flex items-center px-3.5 py-2 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm text-white bg-red-400 hover:bg-red-500"
				>
					Masuk
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile menu, show/hide based on menu state. -->
	<div class="sm:hidden {openMenu ? 'block' : 'hidden'}" id="mobile-menu">
		<div class="pt-2 pb-4 space-y-1">
			<!-- Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" -->
			<a
				href="#"
				class="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
				>Dashboard</a
			>
			<a
				href="#"
				class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
				>Team</a
			>
			<a
				href="#"
				class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
				>Projects</a
			>
			<a
				href="#"
				class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
				>Calendar</a
			>
		</div>
	</div>
</nav>
