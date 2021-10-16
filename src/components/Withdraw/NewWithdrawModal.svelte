<script>
	import _ from 'lodash';
	import * as yup from 'yup';
	import { getContext, onMount } from 'svelte';
	import { createForm } from 'svelte-forms-lib';
	import { getNotificationsContext } from 'svelte-notifications';
	import AutoNumeric from 'autonumeric/dist/autoNumeric.min';

	import { session } from '$app/stores';
	import { goto } from '$app/navigation';

	import arcobaleno from '@api/arcobaleno';
	import { runPromise } from '@helpers';

	import Input from '@components/Input.svelte';
	import Button from '@components/Button.svelte';

	const { close } = getContext('simple-modal');

	let error = '';

	const { addNotification } = getNotificationsContext();
	onMount(async () => {
		new AutoNumeric.multiple('.number', {
			decimalPlaces: 0,
			digitGroupSeparator: '.',
			decimalCharacter: ',',
		});
	});

	const { form, errors, isSubmitting, handleChange, handleSubmit } = createForm({
		initialValues: {
			amount: '0',
		},
		validationSchema: yup.object().shape({
			amount: yup
				.string()
				.test('is-number', 'Harap masukkan angka', (v) => !isNaN(v.replaceAll('.', '')))
				.test(
					'minimum',
					'Minimum withdraw sebesar Rp 10.000 ',
					(v) => parseInt(v.replaceAll('.', '')) >= 10000,
				),
		}),
		onSubmit: async (values) => {
			try {
				values.amount = values.amount.replaceAll('.', '');

				let formData = new FormData();
				_.forEach(values, function (value, key) {
					formData.append(key, value);
				});

				const [response, err] = await runPromise(
					arcobaleno($session).post(`/public/withdraw-request`, formData, {
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
					text: 'Withdraw berhasil dibuat, mohon menunggu untuk diproses',
					type: 'success',
					position: 'top-center',
					removeAfter: 5000,
				});

				close();

				$session.refreshWithdraw = true;
			} catch (e) {
				console.log(e);
			}
		},
	});
</script>

<div class="bg-white">
	<div class="">
		<div class="text-center bg-white px-3 py-3 border-b border-gray-200 sm:px-6">
			<h3 class="text-2xl leading-6 font-medium text-gray-900">Withdraw Baru</h3>
		</div>
	</div>
	<form on:submit={handleSubmit}>
		<div class=" px-4 py-5 sm:p-6 overflow-y-auto" style="max-height:400px;">
			<Input
				label="Jumlah Withdraw"
				name="amount"
				placeholder="100.000,00"
				type="text"
				className="number"
				on:change={handleChange}
				bind:value={$form.amount}
				error={$errors.amount}
			/>
			{#if error}
				<div class="pb-3 text-center">
					<span class="ml-px pl-4 text-sm text-red-400">{error}</span>
				</div>
			{/if}
			<div class="text-center">
				<Button fullWidth={true} type="submit" loading={$isSubmitting}>Ajukan</Button>
			</div>
		</div>
	</form>
</div>
