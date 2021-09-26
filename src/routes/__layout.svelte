<script>
	import '../app.postcss';
	import Notifications from 'svelte-notifications';
	import { setLocale } from 'yup';
	import { session } from '$app/stores';
	import { runPromise } from '@helpers';
	import { browser } from '$app/env';

	import Modal from '@components/Modal.svelte';
	import Nav from '@components/Nav.svelte';
	import Notification from '@components/Notification.svelte';
	import arcobaleno from '@api/arcobaleno';

	setLocale({
		mixed: {
			required: 'Data tidak boleh kosong',
		},
		string: {
			email: 'Email tidak valid',
			required: 'Data tidak boleh kosong',
		},
		number: {
			// min: 'Deve ser maior que ${min}',
		},
	});

	if (browser) {
		$session.refreshUser = true;
	}

	$: if ($session.authenticated && browser && $session.refreshUser) {
		$session.refreshUser = false;
		(async function () {
			const [response, err] = await runPromise(arcobaleno($session).get(`/public/user`));
			if (err) {
				console.log('error when fetching user data');
			}
			$session.user = response.data;
		})();
	}
</script>

<Notifications item={Notification}>
	<Modal>
		<Nav />
		<slot />
	</Modal>
</Notifications>
