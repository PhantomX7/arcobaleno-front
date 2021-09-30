<script>
	import _ from 'lodash';
	import * as yup from 'yup';
	import { getContext, onMount } from 'svelte';
	import { createForm } from 'svelte-forms-lib';
	import { getNotificationsContext } from 'svelte-notifications';
	import AutoNumeric from 'autonumeric/dist/autoNumeric.min';

	import { session } from '$app/stores';

	import arcobaleno from '@api/arcobaleno';
	import { runPromise, formatNumber } from '@helpers';

	import Input from '@components/Input.svelte';
	import Select from '@components/Select.svelte';
	import Button from '@components/Button.svelte';
	import ImageUploader from '@components/ImageUploader.svelte';

	const { close } = getContext('simple-modal');

	let error = '';
	let deposits = [];
	let selectedDeposit;

	const { addNotification } = getNotificationsContext();
	onMount(async () => {
		new AutoNumeric.multiple('.number', {
			decimalPlaces: 0,
			digitGroupSeparator: '.',
			decimalCharacter: ',',
		});
		const [response, err] = await runPromise(arcobaleno($session).get(`/public/deposit`));
		if (err) {
			console.log('error when fetching deposit data');
		}
		deposits = response.data.data;
	});

	const { form, errors, isSubmitting, handleChange, handleSubmit } = createForm({
		initialValues: {
			amount: '0',
			image: '',
			deposit_id: 0,
			note: '',
		},
		validationSchema: yup.object().shape({
			image: yup.string().required('Bukti Pembayaran tidak boleh kosong'),
			note: yup.string().max(32, 'Maksimal 32 karakter'),
			amount: yup.string()
				.test('is-number', 'Harap masukkan angka', (v) => !isNaN(v.replaceAll('.', '')))
				.test('minimum', 'Minimum deposit sebesar Rp 10.000 ', (v) => parseInt(v.replaceAll('.', '')) >= 10),
			deposit_id: yup.number().min(1, 'Metode pembayaran harus dipilih'),
		}),
		onSubmit: async (values) => {
			try {
				values.amount = values.amount.replaceAll('.', '') * 1000;

				let formData = new FormData();
				_.forEach(values, function (value, key) {
					formData.append(key, value);
				});

				const [response, err] = await runPromise(
					arcobaleno($session).post(`/public/deposit-confirmation`, formData, {
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
					text: 'Deposit berhasil dibuat, mohon menunggu untuk diproses',
					type: 'success',
					position: 'top-center',
					removeAfter: 5000,
				});
				close();
				$session.refreshDeposit = true;
			} catch (e) {
				console.log(e);
			}
		},
	});

	$: if (deposits.length > 0) {
		selectedDeposit = _.filter(deposits, (d) => d.id == $form.deposit_id)[0];
	}
</script>

<div class="bg-white">
	<div class="">
		<div class="text-center bg-white px-3 py-3 border-b border-gray-200 sm:px-6">
			<h3 class="text-2xl leading-6 font-medium text-gray-900">Deposit Baru</h3>
		</div>
	</div>
	<form on:submit={handleSubmit}>
		<div class=" px-4 py-5 sm:p-6 overflow-y-auto" style="max-height:400px;">
			<Select
				label="Metode Pembayaran"
				name="deposit_id"
				placeholder="Pilih Metode"
				options={_.map(deposits, (d) => ({ name: d.name, value: d.id }))}
				on:change={handleChange}
				bind:value={$form.deposit_id}
				error={$errors.deposit_id}
			/>
			{#if $form.deposit_id}
				<div class="pl-4 py-3 my-2 text-sm shadow border-b border-gray-200 rounded-lg">
					<div>
						Atas Nama : {selectedDeposit.account_owner}
					</div>
					<div>
						No Rekening : {selectedDeposit.account_number}
					</div>
					Rate: {selectedDeposit.rate * 100}%
					<div />
				</div>
			{/if}
			<Input
				label="Jumlah Deposit"
				name="amount"
				placeholder="100.000,00"
				type="text"
				className="number"
				on:change={handleChange}
				bind:value={$form.amount}
				error={$errors.amount}
			/>
			<div class="pl-4 pb-2">
				Contoh: setoran deposit 50.000, tulis Rp 50 ( 3 digit dihilangkan )
			</div>
			<Input
				label="Jumlah Yang Diterima"
				placeholder="100.000,00"
				type="text"
				disabled
				lead="Rp"
				on:change={handleChange}
				value={selectedDeposit
					? formatNumber($form.amount.replaceAll('.', '') * selectedDeposit.rate * 1000)
					: 0}
			/>
			<Input
				label="Catatan"
				name="note"
				placeholder="Max 32 karakter"
				type="text"
				on:change={handleChange}
				bind:value={$form.note}
				error={$errors.note}
			/>
			<ImageUploader
				name="Upload bukti pembayaran"
				bind:value={$form.image}
				error={$errors.image}
				label="Upload"
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
</div>
