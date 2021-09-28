<script>
	export let meta = { total: 0 };
	export let limit = 20;
	export let url;
	export let query = {};

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
		{#if page != 1}
			<button
				class="text-sm bg-gray-300 text-gray-800
                         font-semibold py-2 px-4"
				on:click={() => {
					if (page == 1) {
						return;
					}
					goto(generatePaginationUrl(url, parseInt(page) - 1, limit, { ...query }));
				}}
			>
				{parseInt(page) - 1}
			</button>
		{/if}
		<button
			class="text-sm bg-gray-400 text-gray-800
                    font-semibold py-2 px-4 "
		>
			{parseInt(page)}
		</button>
		{#if (page != Math.ceil(meta.total / limit)) & (meta.total != 0)}
			<button
				class="text-sm bg-gray-300 text-gray-800
                         font-semibold py-2 px-4"
				on:click={() => {
					if (page == Math.ceil(meta.total / limit)) {
						return;
					}
					goto(generatePaginationUrl(url, parseInt(page) + 1, limit, { ...query }));
				}}
			>
				{parseInt(page) + 1}
			</button>
		{/if}
		<button
			class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800
                    font-semibold py-2 px-4 rounded-r"
			on:click={() => {
				if ((page == Math.ceil(meta.total / limit)) | (meta.total == 0)) {
					return;
				}
				goto(generatePaginationUrl(url, parseInt(page) + 1, limit, { ...query }));
			}}
		>
			{'>'}
		</button>
	</div>
</div>
