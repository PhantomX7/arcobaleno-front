<script>
	import _ from 'lodash';
	import * as yup from 'yup';
	import { createForm } from 'svelte-forms-lib';
	import { getNotificationsContext } from 'svelte-notifications';

	import { session, page } from '$app/stores';

	import arcobaleno from '@api/arcobaleno';
	import { runPromise } from '@helpers';

	import Input from '@components/Input.svelte';
	import Button from '@components/Button.svelte';

	let error = '';

	const { addNotification } = getNotificationsContext();

	const { form, errors, isSubmitting, handleChange, handleSubmit, handleReset } = createForm({
		initialValues: {
			amount: '0',
			user_id: $page.params.id,
			note: '',
		},
		validationSchema: yup.object().shape({
			old_password: yup
				.string()
				.required('Password lama tidak boleh kosong')
				.min(8, 'Password minimal 8 karakter'),
			new_password: yup
				.string()
				.required('Password baru tidak boleh kosong')
				.min(8, 'Password minimal 8 karakter'),
			new_password_confirmation: yup
				.string()
				.required('Konfirmasi password tidak boleh kosong')
				.min(8, 'Password minimal 8 karakter'),
		}),
		onSubmit: async (values) => {
			try {
				if (values.new_password != values.new_password_confirmation) {
					errors.set({
						new_password_confirmation: 'Konfirmasi password harus sama dengan password',
					});
					return;
				}
				let formData = new FormData();
				_.forEach(values, function (value, key) {
					formData.append(key, value);
				});

				const [response, err] = await runPromise(
					arcobaleno($session).post('/public/user/password', formData, {
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					}),
				);
				if (err) {
					error = err.response.data.message;

					return;
				}

				addNotification({
					text: 'Password berhasil diubah',
					type: 'success',
					position: 'top-center',
					removeAfter: 5000,
				});

				$form.old_password = '';
				$form.new_password = '';
				$form.new_password_confirmation = '';
			} catch (e) {
				console.log(e);
			}
		},
	});
</script>

<svelte:head>
	<title>Profil Capjikia</title>
</svelte:head>

<section class="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
	<div class="mt-10 md:flex md:items-center md:justify-between">
		<div class="flex-1 min-w-0">
			<h2 class="px-4 sm:px-6 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
				Ubah Password
			</h2>
		</div>
	</div>
	<form on:submit={handleSubmit}>
		<div class="px-4 py-5 sm:p-6 overflow-y-auto" style="max-height:400px;">
			<Input
				label="Password lama"
				name="old_password"
				placeholder="********"
				type="password"
				on:change={handleChange}
				bind:value={$form.old_password}
				error={$errors.old_password}
			/>
			<Input
				label="Password baru"
				name="new_password"
				placeholder="********"
				type="password"
				on:change={handleChange}
				bind:value={$form.new_password}
				error={$errors.new_password}
			/>
			<Input
				label="Konfirmasi password baru"
				name="new_password_confirmation"
				placeholder="********"
				type="password"
				on:change={handleChange}
				bind:value={$form.new_password_confirmation}
				error={$errors.new_password_confirmation}
			/>
			{#if error}
				<div class="pb-3">
					<span class="ml-px pl-4 text-sm text-red-400">{error}</span>
				</div>
			{/if}
			<div class="text-center">
				<Button fullWidth={true} type="submit" loading={$isSubmitting}>Kirim</Button>
			</div>
		</div>
	</form>
</section>
