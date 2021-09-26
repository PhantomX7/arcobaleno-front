<script context="module">
	export async function load({ session }) {
		if (!session.authenticated) {
			return {
				status: 301,
				redirect: '/',
			};
		}
		return {
			status: 200,
		};
	}
</script>

<script>
	import * as yup from 'yup';
	import { createForm } from 'svelte-forms-lib';
	import { getNotificationsContext } from 'svelte-notifications';
	import axios from 'axios';
	import { session } from '$app/stores';
	import { browser } from '$app/env';

	import Input from '@components/Input.svelte';
	import ListTable from '@components/Deposit/ListTable.svelte';

	import Button from '@components/Button.svelte';
	import { runPromise } from '@helpers';

	const { addNotification } = getNotificationsContext();

	const { form, errors, isSubmitting, handleChange, handleSubmit } = createForm({
		initialValues: {
			email: 'test@gmail.com',
			phone: '132412341234',
			name: 'hehe',
			password: 'q1w2e3r4',
			confirm_password: 'q1w2e3r4',
			bank_name: 'test',
			bank_number: '12341234',
			bank_owner: 'test',
		},
		// initialValues: {
		// 	email: '',
		// 	phone: '',
		// 	name: '',
		// 	password: '',
		// 	confirm_password: '',
		// 	bank_name: '',
		// 	bank_number: '',
		// 	bank_owner: '',
		// },
		validationSchema: yup.object().shape({
			email: yup.string().required('Email tidak boleh kosong').email(),
			phone: yup
				.string()
				.required('No. Handphone tidak boleh kosong')
				.matches(/^\d+$/, 'Nomor telepon tidak valid'),
			name: yup.string().required('Nama tidak boleh kosong'),
			password: yup
				.string()
				.required('Password tidak boleh kosong')
				.min(8, 'Password minimal 8 karakter'),
			confirm_password: yup
				.string()
				.required('Konfirmasi password tidak boleh kosong')
				.min(8, 'Konfirmasi Password minimal 8 karakter'),
			bank_name: yup.string().required('Nama Bank tidak boleh kosong'),
			bank_number: yup
				.string()
				.required('Nomor Rekening Bank tidak boleh kosong')
				.matches(/^\d+$/, 'Nomor Rekening Bank tidak valid'),
			bank_owner: yup.string().required('Nama Pemilik Rekening Bank tidak boleh kosong'),
		}),
		onSubmit: async (values) => {
			if (values.password != values.confirm_password) {
				errors.set({
					confirm_password: 'Konfirmasi password harus sama dengan password',
				});
			}

			const [response, err] = await runPromise(axios.post(`api/signup`, values));
			if (err) {
				console.log(err.response.data);
				if (err.response.data.errors['email'].includes('email already exist')) {
					err.response.data.errors['email'] = 'Email telah terdaftar';
				}
				if (err.response.data.errors['phone'].includes('phone already exist')) {
					err.response.data.errors['phone'] = 'No. Handphone telah terdaftar';
				}
				errors.set(err.response.data.errors);
				addNotification({
					text: 'Gagal Mendaftar',
					type: 'error',
					position: 'top-center',
					removeAfter: 3000,
				});
			}
			$session.token = response.data.token;
			$session.authenticated = true;

			addNotification({
				text: 'Berhasil Mendaftar',
				type: 'success',
				position: 'top-center',
				removeAfter: 3000,
			});
			goto('/');
		},
	});

	if (browser) {
		$session.refreshDeposit = true;
	}

	$: if (browser && $session.refreshDeposit) {
		$session.refreshDeposit = false;
		(async function () {
			const [response, err] = await runPromise(
				arcobaleno($session).get(`/public/deposit-confirmation`),
			);
			if (err) {
				console.log('error when fetching user data');
			}
			$session.user = response.data;
		})();
	}
</script>

<svelte:head>
	<title>Deposit Capjikia</title>
</svelte:head>

<section class="container p-6 py-12 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
	<div class="mt-10 md:flex md:items-center md:justify-between">
		<div class="flex-1 min-w-0">
			<h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Deposit</h2>
		</div>
		<div class="mt-4 flex md:mt-0 md:ml-4">
			<Button fullWidth={false} type="submit" loading={$isSubmitting}>Deposit Baru</Button>
		</div>
	</div>
	<div class="my-8">
		<ListTable />
	</div>
</section>
