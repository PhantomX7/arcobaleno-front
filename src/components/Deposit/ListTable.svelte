<script>
	import _ from 'lodash';
	import moment from 'moment';
	import { formatNumber } from '@helpers';

	export let data = [];

	const getColor = (status) => {
		switch (status) {
			case 'pending':
				return 'bg-yellow-100 text-yellow-800';
			case 'approved':
				return 'bg-green-100 text-green-800';
			case 'rejected':
				return 'bg-red-100 text-red-800';
		}
	};
</script>

<div class="shadow border-b border-gray-200 rounded-lg w-full">
	<table class=" min-w-full divide-y divide-gray-200">
		<thead class="bg-gray-50">
			<tr class="overflow-hidden">
				<th class="px-3 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
					>Tanggal Deposit</th
				>
				<th class="px-3 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
					>Status</th
				>
				<th class="px-3 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
					>Metode</th
				>
				<th class="px-3 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
					>Jumlah</th
				>
				<th class="px-3 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
					>Rate</th
				>
				<th class="px-3 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
					>Jumlah Final</th
				>
				<th class="px-3 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
					>Catatan</th
				>
				<th class="px-3 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
					>Gambar Bukti</th
				>
			</tr>
		</thead>
		<tbody class="bg-white divide-y divide-gray-200 text-xs">
			{#if data.length == 0}
				<tr>
		 			<td colspan="8" class="text-xl px-3 py-4 whitespace-nowrap text-center">
						Belum ada riwayat deposit
					</td>
				</tr>
			{/if}
			{#each data as d}
				<tr>
					<td class="px-3 py-4 whitespace-nowrap">{moment(d.created_at).format('LLL')}</td>
					<td class="px-3 py-4 whitespace-nowrap"
						><span
							class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full {getColor(
								d.status,
							)}"
						>
							{d.status}
						</span></td
					>
					<td class="px-3 py-4 whitespace-nowrap">{d.method}</td>
					<td class="px-3 py-4 whitespace-nowrap">Rp {formatNumber(d.amount)}</td>
					<td class="px-3 py-4 whitespace-nowrap">{d.rate}</td>
					<td class="px-3 py-4 whitespace-nowrap">Rp {formatNumber(d.final_amount)}</td>
					<td class="px-3 py-4 whitespace-nowrap">{d.note}</td>
					<td class="px-3 py-4 whitespace-nowrap">{d.deposit_image_url}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
