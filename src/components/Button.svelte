<script>
	import Spinner from '@components/Spinner.svelte';
	export let type = 'button';
	export let fullWidth = false;
	export let className = '';
	export let loading = false;
	export let disabled = false;
</script>

<button
	class="justify-center {fullWidth &&
		'w-full'} inline-flex items-center px-3.5 py-2 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm text-white bg-red-400 hover:bg-red-500 disabled:opacity-50 disabled:hover:bg-red-400 {className}"
	{type}
	on:click
	disabled={loading || disabled}
>
	{#if loading}
		<Spinner />
	{:else}
		<slot />
	{/if}
</button>
