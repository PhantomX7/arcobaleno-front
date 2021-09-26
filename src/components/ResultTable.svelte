<script>
	import _ from 'lodash';
	import { iterate } from '@helpers';
	import ProgressBar from '@components/ProgressBar.svelte';
	import { loop_guard } from 'svelte/internal';
	let data = [
		{
			created_at: '2021-09-20T13:51:54Z',
			result: 'm5',
		},
		{
			created_at: '2021-09-20T13:30:05Z',
			result: 'h2',
		},
		{
			created_at: '2021-09-20T13:30:00Z',
			result: 'h3',
		},
		{
			created_at: '2021-09-20T13:29:55Z',
			result: 'm1',
		},
		{
			created_at: '2021-09-20T13:29:09Z',
			result: 'm6',
		},
		{
			created_at: '2021-09-20T13:29:04Z',
			result: 'm4',
		},
		{
			created_at: '2021-09-20T13:51:59Z',
			result: 'h5',
		},
		{
			created_at: '2021-09-19T13:51:54Z',
			result: 'm1',
		},
		{
			created_at: '2021-09-19T13:30:05Z',
			result: 'h1',
		},
		{
			created_at: '2021-09-19T13:30:00Z',
			result: 'h3',
		},
		{
			created_at: '2021-09-19T13:29:55Z',
			result: 'm2',
		},
		{
			created_at: '2021-09-19T13:29:09Z',
			result: 'm3',
		},
		{
			created_at: '2021-09-19T13:29:04Z',
			result: 'm5',
		},
	];

	const groups = data.reduce((groups, game) => {
		const date = game.created_at.split('T')[0];
		if (!groups[date]) {
			groups[date] = [];
		}
		groups[date].unshift(game);
		return groups;
	}, {});

	// _.forEach(groups, (_, v) => {
	// 	v.sort(function (a, b) {
	// 		return new Date(b.date) - new Date(a.date);
	// 	});
	// });
</script>

<div class="shadow border-b border-gray-200 rounded-lg overflow-auto w-full">
	<table class="min-w-full divide-y divide-gray-200">
		<thead class="bg-gray-50">
			<tr>
				<th class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
					>Tanggal kontrak</th
				>
				<th class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#1</th>
				<th class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#2</th>
				<th class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#3</th>
				<th class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#4</th>
				<th class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#5</th>
				<th class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#6</th>
				<th class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#7</th>
				<th class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#8</th>
				<th class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#9</th>
				<th class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#10</th
				>
				<th class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#11</th
				>
				<th class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#12</th
				>
				<th
					colspan="3"
					class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
					>Persentase harian</th
				>
			</tr>
		</thead>
		<tbody class="bg-white divide-y divide-gray-200">
			{#each Object.entries(groups) as [date, contents]}
				<tr>
					<td class="px-6 py-4 whitespace-nowrap">{date}</td>
					{#each Array(12) as _, i}
						{#if contents[i]}
							<td
								><span
									class="{contents[i].result.includes('m')
										? 'bg-red-500'
										: 'bg-gray-800'} m-0 text-white font-bold rounded-full flex items-center justify-center font-mono"
									style="height: 30px; width: 30px;;"
								>
									{contents[i].result.includes('m')
										? contents[i].result[1] + 'x'
										: contents[i].result[1] + '='}
								</span></td
							>
						{:else}
							<td />
						{/if}
					{/each}
					<td colspan="3" class="px-6 py-4 whitespace-nowrap"
						><ProgressBar
							red={Math.round(
								(contents.reduce((i, c) => (c.result.includes('m') ? ++i : i), 0) /
									contents.length) *
									100,
							)}
							black={100 -
								Math.round(
									(contents.reduce((i, c) => (c.result.includes('m') ? ++i : i), 0) /
										contents.length) *
										100,
								)}
						/></td
					>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
