<script context="module">
	export async function load({ session }) {
		if (session.authenticated) {
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

	import Input from '@components/Input.svelte';
	import Button from '@components/Button.svelte';
	import { runPromise } from '@helpers';

	const { addNotification } = getNotificationsContext();

	const { form, errors, isSubmitting, handleChange, handleSubmit } = createForm({
		// initialValues: {
		// 	email: 'test@gmail.com',
		// 	phone: '132412341234',
		// 	name: 'hehe',
		// 	password: 'q1w2e3r4',
		// 	confirm_password: 'q1w2e3r4',
		// 	bank_name: 'test',
		// 	bank_number: '12341234',
		// 	bank_owner: 'test',
		// },
		initialValues: {
			email: '',
			phone: '',
			name: '',
			password: '',
			confirm_password: '',
			bank_name: '',
			bank_number: '',
			bank_owner: '',
		},
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
				return;
			}
			values.phone = `62${values.phone}`;

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
</script>

<svelte:head>
	<title>Daftar Capjikia</title>
</svelte:head>

<section class="container p-6 py-12 mx-auto">
	<div class="my-8 sm:mx-auto sm:w-full sm:max-w-md">
		<div class="bg-white pt-2 px-4 shadow sm:rounded-lg sm:px-10 pb-5">
			<div class="text-center bg-white px-3 py-3 border-b border-gray-200 sm:px-6">
				<h3 class="text-2xl leading-6 font-medium text-gray-900">Daftar</h3>
			</div>
			<form class="space-y-6 mt-5" on:submit={handleSubmit}>
				<Input
					label="Email"
					name="email"
					placeholder="contoh@gmail.com"
					type="text"
					on:change={handleChange}
					bind:value={$form.email}
					error={$errors.email}
				/>
				<Input
					label="Nama"
					name="name"
					placeholder="Budi"
					type="text"
					on:change={handleChange}
					bind:value={$form.name}
					error={$errors.name}
				/>
				<Input
					label="No. Handphone"
					name="phone"
					placeholder="821xxxxxxxx"
					type="tel"
					lead="+62"
					on:change={handleChange}
					bind:value={$form.phone}
					error={$errors.phone}
				/>
				<Input
					label="Nama Bank"
					name="bank_name"
					placeholder="BCA"
					type="text"
					on:change={handleChange}
					bind:value={$form.bank_name}
					error={$errors.bank_name}
				/>
				<Input
					label="Nomor Rekening Bank"
					name="bank_number"
					placeholder="412341134"
					type="text"
					on:change={handleChange}
					bind:value={$form.bank_number}
					error={$errors.bank_number}
				/>
				<Input
					label="Nama Pemilik Rekening Bank"
					name="bank_owner"
					placeholder="Budi"
					type="text"
					on:change={handleChange}
					bind:value={$form.bank_owner}
					error={$errors.bank_owner}
				/>
				<Input
					label="Password"
					name="password"
					placeholder="**********"
					type="password"
					on:change={handleChange}
					bind:value={$form.password}
					error={$errors.password}
				/>
				<Input
					label="Konfirmasi Password"
					name="confirm_password"
					placeholder="**********"
					type="password"
					on:change={handleChange}
					bind:value={$form.confirm_password}
					error={$errors.confirm_password}
				/>

				<div class="text-center">
					<Button fullWidth={true} type="submit" loading={$isSubmitting}>Daftar</Button>
				</div>
			</form>
		</div>
	</div>
</section>
