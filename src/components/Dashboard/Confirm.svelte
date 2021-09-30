<script>
	import Button from '@components/Button.svelte';
	import Input from '@components/Input.svelte';
	import { getContext } from 'svelte';

	const { close } = getContext('simple-modal');
	export let callback = () => {};
	export let total = '';
</script>

<div class="bg-white">
	<div class="">
		<div class="text-center bg-white px-3 py-3 border-b border-gray-200 sm:px-6">
			<h3 class="text-2xl leading-6 font-medium text-gray-900">Konfirmasi Pembelian</h3>
		</div>
	</div>
	<div class=" px-4 py-5 sm:p-6 overflow-y-auto" style="max-height:400px;">
		<div class="text-center">
			<div class="pb-5">
				Total nilai kontrak: Rp {total}.
				<br /> Kontrak yang sudah dibeli tidak dapat dibatalkan.
			</div>
			<Button
				fullWidth={true}
				type="button"
				on:click={() => {
					callback();
					close();
				}}>Beli</Button
			>
		</div>
	</div>
</div>
