<script>
	import _ from 'lodash';
	import { createEventDispatcher } from 'svelte';

	export let value = '';
	export let placeholder = '';
	export let name = '';
	export let label = '';
	export let lead = '';
	export let type;
	export let error = '';

	const onInput = (e) => {
		value = e.target.value;
	};
</script>

<div class="mb-3">
	<label class="ml-px pl-4 block text-sm font-medium text-gray-700" for={name}>{label}</label>
	{#if lead}
		<div class="relative rounded-md shadow-sm">
			<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
				<span class="text-gray-500 sm:text-sm">
					{lead}
				</span>
			</div>
			<input
				class="focus:ring-red-400 focus:border-red-400 block w-full pl-16 sm:pl-14 sm:text-sm border-gray-300 rounded-full placeholder-gray-300"
				{type}
				{name}
				on:input={onInput}
				on:change
				{value}
				{placeholder}
			/>
		</div>
	{:else}
		<input
			class="shadow-sm focus:ring-red-400 focus:border-red-400 block w-full sm:text-sm border-gray-300 px-4 rounded-full placeholder-gray-300"
			{type}
			{name}
			on:input={onInput}
			on:change
			{value}
			{placeholder}
		/>
	{/if}

	{#if error !== undefined && !_.isEmpty(error)}
		<span class="ml-px pl-4 text-sm text-red-400">{error}</span>
	{/if}
</div>
