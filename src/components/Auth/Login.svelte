<script>
	import Input from '@components/Input.svelte';
</script>

<div class="bg-white">
	<div class="">
		<div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
			<h3 class="text-2xl font-bold leading-6 text-gray-900">Masuk</h3>
		</div>
	</div>
	<form>
		<div class=" px-4 py-5 sm:p-6 overflow-y-auto" style="max-height:400px;">
			<Input name="Username" type="text" />
			<Input name="Password" type="password" />
			<Input name="Konfirmasi Password" type="password" />
			<button
				class="inline-block w-full px-6 py-2 font-medium text-white bg-red-400 hover:bg-red-500 rounded-full transition duration-200"
				type="submit">Masuk</button
			>
		</div>
	</form>
</div>
