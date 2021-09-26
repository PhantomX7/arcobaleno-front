<script>
	import _ from 'lodash';

	export let value;
	export let avatar = '';
	export let name;
	export let accept = '.jpg, .jpeg, .png';
	export let label;
	export let error = '';
	export let imageDisplay = true;
  
	let fileinput;
	let currentAvatar;
	const onFileSelected = (e) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			currentAvatar = e.target.result;
		};
	};
	const onInput = (e) => {
		value = e.target.files[0];
	};
</script>

<div class="mt-2 pl-4 mb-3">
	<label class="block text-sm font-medium mb-2" for={name}>{name}</label>
	{#if imageDisplay != 'false'}
		{#if currentAvatar || avatar}
			<img class="avatar object-cover" src={currentAvatar ? currentAvatar : avatar} alt="d" />
		{/if}
		<div
			class="cursor-pointer justify-center inline-flex items-center px-3.5 py-2 shadow border-b border-gray-200 border border-transparent text-sm leading-4 font-medium rounded-full bg-white hover:bg-gray-100"
			on:click={() => {
				fileinput.click();
			}}
		>
			<i class="fa fa-upload fa-2xl" aria-hidden="true" />
			{label}
		</div>
		<input
			style="display:none"
			type="file"
			{accept}
			on:change={(e) => onFileSelected(e)}
			on:input={onInput}
			bind:this={fileinput}
		/>
	{:else}
		<input
			type="file"
			{accept}
			on:change={(e) => onFileSelected(e)}
			on:input={onInput}
			bind:this={fileinput}
		/>
	{/if}
	{#if error !== undefined && !_.isEmpty(error)}
		<span class="ml-px pl-4 text-sm text-red-400">{error}</span>
	{/if}
</div>

<style>
	.avatar {
		display: flex;
		height: 200px;
		width: 200px;
	}
</style>
