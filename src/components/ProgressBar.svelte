<script>
	export let red = 50,
		black = 50;
</script>

<div class="relative pt-1">
	<div class="overflow-hidden h-6 text-xs flex rounded bg-amber-200" style="min-width: 300px">
		<div
			style="width: {red}%"
			class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
		>
			{red}%
		</div>
		<div
			style="width: {black}%"
			class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-800"
		>
			{black}%
		</div>
	</div>
</div>
