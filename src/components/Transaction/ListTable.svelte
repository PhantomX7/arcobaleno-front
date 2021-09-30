<script>
	import _ from 'lodash';
	import moment from 'moment';
	import { formatNumber } from '@helpers';

	export let data = [];

	let list = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'm1', 'm2', 'm3', 'm4', 'm5', 'm6'];

	const getColor = (status) => {
		switch (status) {
			case 'ongoing':
				return 'bg-yellow-100 text-yellow-800';
			case 'completed':
				return 'bg-green-100 text-green-800';
		}
	};
	// let l = 'h1';
</script>

<div class="shadow border-b border-gray-200 rounded-lg w-full overflow-auto">
	<table class=" min-w-full divide-y divide-gray-200">
		<thead class="bg-gray-50">
			<tr class="overflow-hidden">
				<th class="px-3 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
					>Tanggal Transaksi</th
				>
				<th class="px-3 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
					>Status</th
				>
				<th class="px-3 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
					>Daftar Kontrak</th
				>
				<th class="px-3 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
					>Total Nilai Kontrak</th
				>
				<th class="px-3 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
					>Keuntungan</th
				>
				<th class="px-3 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
					>Biaya Admin</th
				>
				<th class="px-3 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
					>Keuntungan Final</th
				>
			</tr>
		</thead>
		<tbody class="bg-white divide-y divide-gray-200 text-xs">
			{#if data.length == 0}
				<tr>
					<td colspan="8" class="text-xl px-3 py-4 whitespace-nowrap text-center">
						Belum ada riwayat transaksi
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
								d.status,
							)}"
						>
							{d.status == 'ongoing' ? 'sedang berlangsung' : 'selesai'}
						</span></td
					>
					<td class="px-3 py-4 text-center whitespace-nowrap">
						{#each list.filter((l) => d[l] > 0) as l}
							<!-- content here -->
							<div class="flex items-center p-1">
								<span
									class="{l.includes('m')
										? 'bg-red-500'
										: 'bg-gray-800'} m-0 mr-1 text-white font-bold rounded-full flex items-center justify-center font-mono text-xs inline-block"
									style="height: 20px; width: 20px;"
								>
									{l.includes('m') ? l[1] + 'x' : l[1] + '='}
								</span>
								Rp {formatNumber(d[l])}
							</div>
						{/each}
					</td>
					<td class="px-3 py-4 text-center whitespace-nowrap">Rp {formatNumber(d.total)}</td>
					<td class="px-3 py-4 text-center whitespace-nowrap"
						><span
							class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full {d.gain > 0
								? 'bg-green-100 text-green-800'
								: 'bg-gray-100 text-gray-800'}"
						>
							Rp {formatNumber(d.gain)}
						</span></td
					>
					<td class="px-3 py-4 text-center whitespace-nowrap"
						><span
							class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800"
						>
							Rp {formatNumber(d.gain_fee)}
						</span></td
					>
					<td class="px-3 py-4 text-center whitespace-nowrap"
						><span
							class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full {d.final_gain > 0
								? 'bg-green-100 text-green-800'
								: 'bg-gray-100 text-gray-800'}"
						>
							Rp {formatNumber(d.final_gain)}
						</span></td
					>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
