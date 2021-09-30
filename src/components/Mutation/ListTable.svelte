<script>
	import _ from 'lodash';
	import moment from 'moment';
	import { getContext } from 'svelte';
	import { formatNumber } from '@helpers';

	// import ImageModal from '@components/ImageModal.svelte';

	export let data = [];

	const { open } = getContext('simple-modal');
	let list = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'm1', 'm2', 'm3', 'm4', 'm5', 'm6'];

	const getColor = (type) => {
		switch (type) {
			case 'debit':
				return 'bg-green-100 text-green-800';
			case 'credit':
				return 'bg-red-100 text-red-800';
		}
	};
	// let l = 'h1';
</script>

<div class="shadow border-b border-gray-200 rounded-lg w-full overflow-auto">
	<table class=" min-w-full divide-y divide-gray-200">
		<thead class="bg-gray-50">
			<tr class="overflow-hidden">
				<th class="px-3 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
					>Tanggal Mutasi</th
				>
				<th class="px-3 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
					>Tipe</th
				>
				<th class="px-3 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
					>Jumlah</th
				>
				<th class="px-3 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
					>Akhir Saldo</th
				>
				<th class="px-3 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
					>Keterangan</th
				>
			</tr>
		</thead>
		<tbody class="bg-white divide-y divide-gray-200 text-xs">
			{#if data.length == 0}
				<tr>
					<td colspan="8" class="text-xl px-3 py-4 whitespace-nowrap text-center">
						Belum ada riwayat mutasi
					</td>
				</tr>
			{/if}
			{#each data as d}
				<tr>
					<td class="px-3 py-4 text-center whitespace-nowrap"
						>{moment(d.created_at).format('LLL')}</td
					>
					<td class="px-3 py-4 text-center whitespace-nowrap"
						><span
							class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full {getColor(
								d.type,
							)}"
						>
							{d.type}
						</span></td
					>
					<td class="px-3 py-4 text-center whitespace-nowrap">Rp {formatNumber(d.amount)}</td>
					<td class="px-3 py-4 text-center whitespace-nowrap">Rp {formatNumber(d.balance)}</td>
					<td class="px-3 py-4 text-center whitespace-nowrap">{d.description}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
