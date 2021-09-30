<script>
	import '../app.postcss';

	import Notifications from 'svelte-notifications';
	import { setLocale } from 'yup';
	import { session } from '$app/stores';
	import { user } from '@store';

	import Modal from '@components/Modal.svelte';
	import Nav from '@components/Nav.svelte';
	import Notification from '@components/Notification.svelte';

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

	$: if ($session.authenticated) {
		user.fetch($session);
	}
</script>

<Notifications item={Notification}>
	<Modal>
		<Nav />
		<slot />
	</Modal>
</Notifications>
