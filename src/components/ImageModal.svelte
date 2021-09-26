<script>
	export let src;
</script>

<div class="bg-white">
	<div class="">
		<div class="text-center bg-white px-3 py-3 border-b border-gray-200 sm:px-6">
			<h3 class="text-2xl leading-6 font-medium text-gray-900">Detail gambar</h3>
		</div>
	</div>
	<div class=" px-4 py-5 sm:p-6 overflow-y-auto" style="max-height:400px;">
		<img {src} alt="detail" />
	</div>
</div>
