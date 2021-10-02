<script>
	export let limit = 20;
	export let url;
	export let query = {};
	export let stopNext = false;

	let page = 1;
	$: {
		if (query.page) {
			page = query.page;
		}
		if (query.limit) {
			limit = query.limit;
		}
	}

	import { goto } from '$app/navigation';
	import { generatePaginationUrl } from '@helpers';
</script>

<div
	class="flex flex-col xs:flex-row
        items-center xs:justify-between"
>
	<div class="inline-flex mt-2 xs:mt-0">
		<button
			class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800
                    font-semibold py-2 px-4 rounded-l"
			on:click={() => {
				if (page == 1) {
					return;
				}
				goto(generatePaginationUrl(url, parseInt(page) - 1, limit, { ...query }));
			}}
		>
			{'<'}
		</button>
		<button
			class="text-sm bg-gray-400 text-gray-800
                    font-semibold py-2 px-4"
			disabled
		/>
		<button
			class="text-sm bg-gray-400 text-gray-800
                    font-semibold py-2 px-4"
			disabled
		/>
		<button
			class="text-sm bg-gray-400 text-gray-800
                    font-semibold py-2 px-4"
			disabled
		/>
		<button
			class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800
                    font-semibold py-2 px-4 rounded-r"
			on:click={() => {
				if (stopNext) {
					return;
				}
				goto(generatePaginationUrl(url, parseInt(page) + 1, limit, { ...query }));
			}}
		>
			{'>'}
		</button>
	</div>
</div>
