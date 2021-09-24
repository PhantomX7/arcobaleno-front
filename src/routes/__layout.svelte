<script>
	import '../app.postcss';
	import Notifications from 'svelte-notifications';
	import Modal from '@components/Modal.svelte';
	import Nav from '@components/Nav.svelte';
	import { setLocale } from 'yup';

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
</script>

<Notifications>
	<Modal>
		<Nav />
		<slot />
	</Modal>
</Notifications>
