<script>
	import _ from 'lodash';

	export let value = '';
	export let placeholder = '';
	export let name = '';
	export let label = '';
	export let error = '';
	export let options = [];

	import { clickOutside } from '@helpers';
	let selected;

	$: {
		selected = _.filter(options, (option) => option.value == value)[0];
	}

	let openMenu = false;
</script>

<div class="mb-3">
	<div>
		<label class="ml-px pl-4 block text-sm font-medium text-gray-700" for={name}>{label}</label>
		<div class="mt-1 relative">
			<input class="hidden" {name} on:change {value} {placeholder} />
			<button
				type="button"
				class="bg-white relative w-full border border-gray-300 rounded-full shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-red-400 focus:border-red-400 sm:text-sm"
				aria-haspopup="listbox"
				aria-expanded="true"
				aria-labelledby="listbox-label"
				on:click={(e) => {
					e.stopPropagation();
					openMenu = !openMenu;
				}}
			>
				<span class="block truncate"> {selected ? selected.name : placeholder} </span>
				<span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
					<!-- Heroicon name: solid/selector -->
					<svg
						class="h-5 w-5 text-gray-400"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/>
					</svg>
				</span>
			</button>
			<ul
				class=" {openMenu
					? 'block'
					: 'hidden'} overflow-x-hidden max-h-40 cursor-pointer absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-scroll focus:outline-none sm:text-sm"
				tabindex="-1"
				role="listbox"
				aria-labelledby="listbox-label"
				aria-activedescendant="listbox-option-3"
				use:clickOutside={() => {
					openMenu = false;
				}}
			>

				{#each options as option}
					<li
						class="text-gray-900 hover:text-white hover:bg-red-400 select-none relative py-2 pl-3 pr-9"
						id="listbox-option-0"
						role="option"
						on:click={() => {
							openMenu = false;
							value = option.value;
						}}
					>
						<!-- Selected: "font-semibold", Not Selected: "font-normal" -->
						<span
							class="font-normal block truncate {selected == option
								? 'font-semibold'
								: 'font-normal'}">{option.name}</span
						>

						<!--
				Checkmark, only display for selected option.
	  
				Highlighted: "text-white", Not Highlighted: "text-indigo-600"
			  -->
						{#if selected == option}
							<span
								class="text-red-400 hover:text-white absolute inset-y-0 right-0 flex items-center pr-4"
							>
								<svg
									class="h-5 w-5"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clip-rule="evenodd"
									/>
								</svg>
							</span>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	</div>

	{#if error !== undefined && !_.isEmpty(error)}
		<span class="ml-px pl-4 text-sm text-red-400">{error}</span>
	{/if}
</div>
