<script>
	import _ from 'lodash';
	import moment from 'moment';
	import { formatNumber } from '@helpers';

	export let data = [];
</script>

<div class="shadow border-b border-gray-200 rounded-lg w-full overflow-auto">
	<table class=" min-w-full divide-y divide-gray-200">
		<tr class="overflow-hidden">
			<th
				class="bg-gray-50 px-3 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
				>Name</th
			>
			<td class="px-3 py-4 text-center whitespace-nowrap">{data.name}</td>
		</tr>
		<tr class="overflow-hidden">
			<th
				class="bg-gray-50 px-3 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
				>Phone</th
			>
			<td class="px-3 py-4 text-center whitespace-nowrap">{data.phone}</td>
		</tr>
		<tr class="overflow-hidden">
			<th
				class="bg-gray-50 px-3 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
				>Email</th
			>
			<td class="px-3 py-4 text-center whitespace-nowrap">{data.email}</td>
		</tr>
		<tr class="overflow-hidden">
			<th
				class="bg-gray-50 px-3 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
				>Wallet</th
			>
			<td class="px-3 py-4 text-center whitespace-nowrap">Rp {formatNumber(data.wallet.amount)}</td>
		</tr>
		<tr class="overflow-hidden">
			<th
				class="bg-gray-50 px-3 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
				>Nama Bank</th
			>
			<td class="px-3 py-4 text-center whitespace-nowrap">{data.bank.name}</td>
		</tr>
		<tr class="overflow-hidden">
			<th
				class="bg-gray-50 px-3 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
				>Nomor Bank</th
			>
			<td class="px-3 py-4 text-center whitespace-nowrap">{data.bank.number}</td>
		</tr>
		<tr class="overflow-hidden">
			<th
				class="bg-gray-50 px-3 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
				>Pemilik Bank</th
			>
			<td class="px-3 py-4 text-center whitespace-nowrap">{data.bank.owner}</td>
		</tr>
		<tr class="overflow-hidden">
			<th
				class="bg-gray-50 px-3 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
				>Mendaftar pada</th
			>
			<td class="px-3 py-4 text-center whitespace-nowrap"
				>{moment(data.created_at).format('LLL')}</td
			>
		</tr>
	</table>
</div>
