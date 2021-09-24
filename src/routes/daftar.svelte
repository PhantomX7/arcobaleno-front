<script>
	import Input from '@components/Input.svelte';
	import * as yup from 'yup';
	import { createForm } from 'svelte-forms-lib';
	import { getNotificationsContext } from 'svelte-notifications';
	const { addNotification } = getNotificationsContext();

	const { form, errors, state, handleChange, handleSubmit } = createForm({
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
			password: yup.string().required('Password tidak boleh kosong'),
			confirm_password: yup.string().required('Konfirmasi password tidak boleh kosong'),
			bank_name: yup.string().required('Nama Bank tidak boleh kosong'),
			bank_number: yup.string().required('Nomor Rekening Bank tidak boleh kosong').matches(/^\d+$/, 'Nomor Rekening Bank tidak valid'),
			bank_owner: yup.string().required('Nama Pemilik Rekening Bank tidak boleh kosong'),
		}),
		// validate: values => {
		// 	let errs = {}
		// 	if (values.confirm_password != values.password) {
		// 		errs['confirm_password'] = "Konfirmasi password tidak sesuai dengan password"
		// 	}
		// },
		onSubmit: async (values) => {
			// try {
			// 	// const res = await axios.post(`api/signup`, { ...values });
			// 	// $session.ADMIN_TOKEN = res.data.token;
			// 	// $session.USER = res.data.decoded;
			// 	addNotification({
			// 		text: 'Berhasil Mendaftar',
			// 		type: 'success',
			// 		position: 'top-right',
			// 		removeAfter: 3000,
			// 	});
			// 	goto('/admin/customer');
			// } catch (error) {
			// 	addNotification({
			// 		text: 'Gagal Mendaftar',
			// 		type: 'danger',
			// 		position: 'top-right',
			// 		removeAfter: 3000,
			// 	});
			// }
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
					name="password_confirmation"
					placeholder="**********"
					type="password"
					on:change={handleChange}
					bind:value={$form.confirm_password}
					error={$errors.confirm_password}
				/>

				<div class="text-center">
					<button
						class="justify-center w-full inline-flex items-center px-3.5 py-2 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm text-white bg-red-400 hover:bg-red-500"
						type="submit">Daftar</button
					>
				</div>
			</form>
		</div>
	</div>
</section>
