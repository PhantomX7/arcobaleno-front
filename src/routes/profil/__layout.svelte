<script>
	import { page } from '$app/stores';
</script>

<div class="container pt-4 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
	<nav class="-mb-px flex space-x-8 pt-20">
		<a
			href="/profil"
			class="{$page.path.split('/').length == 2
				? 'border-red-500 text-red-600'
				: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap pb-2 px-1 border-b-2 font-medium text-sm"
		>
			Profile 
		</a>
		<a
			href="/profil/password"
			class="{$page.path.split('/')[2] == 'password'
				? 'border-red-500 text-red-600'
				: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap pb-2 px-1 border-b-2 font-medium text-sm"
		>
			Ubah Password
		</a>
	</nav>
</div>

<slot />
