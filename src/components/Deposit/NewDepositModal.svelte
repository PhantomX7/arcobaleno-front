<script>
	import * as yup from 'yup';
	import { getContext } from 'svelte';
	import { createForm } from 'svelte-forms-lib';
	import { getNotificationsContext } from 'svelte-notifications';
	import axios from 'axios';
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';

	import Input from '@components/Input.svelte';
	import Button from '@components/Button.svelte';
	import { runPromise } from '@helpers';

	const { close } = getContext('simple-modal');

	let error = '';

	const { addNotification, subscribe } = getNotificationsContext();
	const { form, errors, isSubmitting, handleChange, handleSubmit } = createForm({
		initialValues: {
			email: 'test@gmail.com',
			password: 'q1w2e3r4',
		},
		validationSchema: yup.object().shape({
			email: yup.string().required('Email tidak boleh kosong').email(),
			password: yup
				.string()
				.required('Password tidak boleh kosong')
				.min(8, 'Password minimal 8 karakter'),
		}),
		onSubmit: async (values) => {
			const [response, err] = await runPromise(axios.post(`api/signin`, values));
			if (err) {
				error = 'Email dan password tidak sesuai';
				addNotification({
					text: 'Email dan password tidak sesuai',
					type: 'error',
					position: 'top-center',
					removeAfter: 3000,
				});
				return;
			}
			$session.token = response.data.token;
			$session.authenticated = true;

			addNotification({
				text: 'Berhasil masuk',
				type: 'success',
				position: 'top-center',
				removeAfter: 3000,
			});
			close();
			goto('/');
		},
	});
</script>

<div class="bg-white">
	<div class="">
		<div class="text-center bg-white px-3 py-3 border-b border-gray-200 sm:px-6">
			<h3 class="text-2xl leading-6 font-medium text-gray-900">Masuk</h3>
		</div>
	</div>
	<form on:submit={handleSubmit}>
		<div class=" px-4 py-5 sm:p-6 overflow-y-auto" style="max-height:400px;">
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
				label="Password"
				name="password"
				placeholder="**********"
				type="password"
				on:change={handleChange}
				bind:value={$form.password}
				error={$errors.password}
			/>
			{#if error}
				<div class="pb-3">
					<span class="ml-px pl-4 text-sm text-red-400">{error}</span>
				</div>
			{/if}
			<div class="text-center">
				<Button fullWidth={true} type="submit" loading={$isSubmitting}>Masuk</Button>
			</div>
		</div>
	</form>
</div>
