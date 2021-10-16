<script context="module">
	export async function load({ session, page }) {
		if (!session.authenticated) {
			return {
				status: 301,
				redirect: '/',
			};
		}

		let user = {};

		let [response, err] = await runPromise(arcobaleno(session).get(`/public/user`));
		if (err) {
			console.log('error when fetching user data');
			return {
				status: 200,
				props: {
					user,
				},
			};
		}

		user = response.data;

		return {
			status: 200,
			props: {
				user,
			},
		};
	}
</script>

<script>
	import arcobaleno from '@api/arcobaleno';

	import Detail from '@components/Profile/Detail.svelte';

	import { runPromise } from '@helpers';

	export let user = {};
</script>

<svelte:head>
	<title>Profil Capjikia</title>
</svelte:head>

<section class="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
	<div class="mt-10 md:flex md:items-center md:justify-between">
		<div class="flex-1 min-w-0">
			<h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">User</h2>
		</div>
	</div>
	<div class="my-8">
		<Detail data={user} />
	</div>
</section>
