<script>
	import _ from 'lodash';

	export let value = '';
	export let placeholder = '';
	export let name = '';
	export let label = '';
	export let lead = '';
	export let type;
	export let error = '';
	export let disabled = false;
	export let className = '';

	const onInput = (e) => {
		value = e.target.value;
	};
</script>

<div class="mb-3">
	<label class="ml-px pl-4 block text-sm font-medium text-gray-700" for={name}>{label}</label>
	{#if lead}
		<div class="relative rounded-full shadow-sm">
			<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
				<span class="text-gray-500 sm:text-sm">
					{lead}
				</span>
			</div>
			<input
				class="focus:ring-red-400 focus:border-red-400 block w-full pl-14 sm:pl-12 sm:text-sm border-gray-300 rounded-full placeholder-gray-300 {className}"
				{type}
				{name}
				on:input={onInput}
				on:change
				{value}
				{disabled}
				{placeholder}
			/>
			{#if error !== undefined && !_.isEmpty(error)}
				<div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
					<!-- Heroicon name: solid/exclamation-circle -->
					<svg
						class="h-5 w-5 text-red-500"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
							clip-rule="evenodd"
						/>
					</svg>
				</div>
			{/if}
		</div>
	{:else}
		<div class="mt-1 relative rounded-full shadow-sm">
			<input
				class="shadow-sm focus:ring-red-400 focus:border-red-400 block w-full sm:text-sm border-gray-300 px-4 rounded-full placeholder-gray-300 {className}"
				{type}
				{name}
				on:input={onInput}
				on:change
				{value}
				{placeholder}
				{disabled}
			/>
			{#if error !== undefined && !_.isEmpty(error)}
				<div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
					<!-- Heroicon name: solid/exclamation-circle -->
					<svg
						class="h-5 w-5 text-red-500"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
							clip-rule="evenodd"
						/>
					</svg>
				</div>
			{/if}
		</div>
	{/if}

	{#if error !== undefined && !_.isEmpty(error)}
		<span class="ml-px pl-4 text-sm text-red-400">{error}</span>
	{/if}
</div>
