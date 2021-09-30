<script>
	import _ from 'lodash';
	import * as yup from 'yup';
	import { onMount, getContext } from 'svelte';
	import { createForm } from 'svelte-forms-lib';
	import { getNotificationsContext } from 'svelte-notifications';
	import AutoNumeric from 'autonumeric/dist/autoNumeric.min';

	import { browser } from '$app/env';
	import { session } from '$app/stores';
	import { user, cjkTransactionSummary } from '@store';

	import arcobaleno from '@api/arcobaleno';
	import { runPromise, formatNumber } from '@helpers';

	import Input from '@components/Input.svelte';
	import Button from '@components/Button.svelte';
	import Confirm from '@components/Dashboard/Confirm.svelte';

	const { open } = getContext('simple-modal');

	let list = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'm1', 'm2', 'm3', 'm4', 'm5', 'm6'];
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
			h1: '0',
			h2: '0',
			h3: '0',
			h4: '0',
			h5: '0',
			h6: '0',
			m1: '0',
			m2: '0',
			m3: '0',
			m4: '0',
			m5: '0',
			m6: '0',
		},
		validationSchema: yup.object().shape({
			h1: yup
				.string()
				.test('is-number', 'Harap masukkan angka', (v) => !isNaN(v.replaceAll('.', '')))
				.test('minimum', 'Tidak boleh dibawah 0', (v) => parseInt(v.replaceAll('.', '')) >= 0),
			h2: yup
				.string()
				.test('is-number', 'Harap masukkan angka', (v) => !isNaN(v.replaceAll('.', '')))
				.test('minimum', 'Tidak boleh dibawah 0', (v) => parseInt(v.replaceAll('.', '')) >= 0),
			h3: yup
				.string()
				.test('is-number', 'Harap masukkan angka', (v) => !isNaN(v.replaceAll('.', '')))
				.test('minimum', 'Tidak boleh dibawah 0', (v) => parseInt(v.replaceAll('.', '')) >= 0),
			h4: yup
				.string()
				.test('is-number', 'Harap masukkan angka', (v) => !isNaN(v.replaceAll('.', '')))
				.test('minimum', 'Tidak boleh dibawah 0', (v) => parseInt(v.replaceAll('.', '')) >= 0),
			h5: yup
				.string()
				.test('is-number', 'Harap masukkan angka', (v) => !isNaN(v.replaceAll('.', '')))
				.test('minimum', 'Tidak boleh dibawah 0', (v) => parseInt(v.replaceAll('.', '')) >= 0),
			h6: yup
				.string()
				.test('is-number', 'Harap masukkan angka', (v) => !isNaN(v.replaceAll('.', '')))
				.test('minimum', 'Tidak boleh dibawah 0', (v) => parseInt(v.replaceAll('.', '')) >= 0),
			m1: yup
				.string()
				.test('is-number', 'Harap masukkan angka', (v) => !isNaN(v.replaceAll('.', '')))
				.test('minimum', 'Tidak boleh dibawah 0', (v) => parseInt(v.replaceAll('.', '')) >= 0),
			m2: yup
				.string()
				.test('is-number', 'Harap masukkan angka', (v) => !isNaN(v.replaceAll('.', '')))
				.test('minimum', 'Tidak boleh dibawah 0', (v) => parseInt(v.replaceAll('.', '')) >= 0),
			m3: yup
				.string()
				.test('is-number', 'Harap masukkan angka', (v) => !isNaN(v.replaceAll('.', '')))
				.test('minimum', 'Tidak boleh dibawah 0', (v) => parseInt(v.replaceAll('.', '')) >= 0),
			m4: yup
				.string()
				.test('is-number', 'Harap masukkan angka', (v) => !isNaN(v.replaceAll('.', '')))
				.test('minimum', 'Tidak boleh dibawah 0', (v) => parseInt(v.replaceAll('.', '')) >= 0),
			m5: yup
				.string()
				.test('is-number', 'Harap masukkan angka', (v) => !isNaN(v.replaceAll('.', '')))
				.test('minimum', 'Tidak boleh dibawah 0', (v) => parseInt(v.replaceAll('.', '')) >= 0),
			m6: yup
				.string()
				.test('is-number', 'Harap masukkan angka', (v) => !isNaN(v.replaceAll('.', '')))
				.test('minimum', 'Tidak boleh dibawah 0', (v) => parseInt(v.replaceAll('.', '')) >= 0),
		}),
		onSubmit: async (values) => {
			try {
				if (list.reduce((total, l) => total + parseInt(values[l].replaceAll('.', '')), 0) * 1000 <= 0) {
					error =
						'Minimum harus membeli 1 kontrak ' +
						list.reduce((total, l) => total + parseInt(values[l].replaceAll('.', '')), 0);

					return;
				}

				if (
					$user.wallet.amount -
						list.reduce((total, l) => total + parseInt(values[l].replaceAll('.', '')), 0) * 1000 <
					0
				) {
					error = 'Saldo tidak mencukupi. Deposit untuk melanjutkan.';

					return;
				}

				let formData = new FormData();
				_.forEach(values, function (value, key) {
					formData.append(key, parseInt(value.replaceAll('.', '')) * 1000);
				});

				const [response, err] = await runPromise(
					arcobaleno($session).post(`/public/cjk-transaction`, formData, {
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
					text: 'Kontrak berhasil dibeli',
					type: 'success',
					position: 'top-center',
					removeAfter: 5000,
				});

				user.fetch($session);
				cjkTransactionSummary.fetch($session);

				$form = {
					h1: '0',
					h2: '0',
					h3: '0',
					h4: '0',
					h5: '0',
					h6: '0',
					m1: '0',
					m2: '0',
					m3: '0',
					m4: '0',
					m5: '0',
					m6: '0',
				};
			} catch (e) {
				console.log(e);
			}
		},
	});

	cjkTransactionSummary.fetch($session);
</script>

<div>
	{#if browser}
		<form on:submit={handleSubmit}>
			<div class="overflow-auto py-4 px-3 w-full">
				<ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{#each list as l}
						<li class="col-span-1 bg-white rounded-lg shadow-md divide-y divide-gray-200">
							<div class="w-full flex items-center justify-between p-3 sm:p-6 space-x-6">
								<span
									class="{l.includes('m')
										? 'bg-red-500'
										: 'bg-gray-800'} m-0 text-white font-bold rounded-full flex items-center justify-center font-mono text-lg"
									style="height: 50px; width: 50px;"
								>
									{l.includes('m') ? l[1] + 'x' : l[1] + '='}
								</span>
								<div class="flex-1 truncate">
									<div class=" pl-2 w-full">
										<Input
											label="Jumlah Kontrak"
											name={l}
											placeholder="10"
											type="text"
											className="number"
											on:change={handleChange}
											bind:value={$form[l]}
											error={$errors[l]}
										/>
									</div>
									<div class=" pl-2 w-full">
										<Input
											label="Nilai Kontrak"
											placeholder="100.000,00"
											type="text"
											disabled
											lead="Rp"
											on:change={handleChange}
											value={formatNumber($form[l].replaceAll('.', '') * 1000)}
										/>
									</div>
								</div>
							</div>
							<div>
								<div class="-mt-px flex divide-x text-sm divide-gray-200">
									<div
										class="w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg"
									>
										<!-- Heroicon name: solid/mail -->
										<span class="ml-3">Jumlah kontrak yang dimiliki sekarang</span>
									</div>
									<div
										class="w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg"
									>
										<!-- Heroicon name: solid/phone -->
										<span class=""
											>Rp {formatNumber(
												$cjkTransactionSummary ? $cjkTransactionSummary[l] : 0,
											)}</span
										>
									</div>
								</div>
							</div>
						</li>
					{/each}

					<!-- More people... -->
				</ul>
				<div class="text-center mt-10 flex justify-center">
					<div class="w-full max-w-md">
						<Input
							label="Total Nilai Kontrak"
							placeholder="100.000,00"
							className="w-full max-w-md"
							type="text"
							disabled
							lead="Rp"
							on:change={handleChange}
							value={formatNumber(
								list.reduce((total, l) => total + parseInt($form[l].replaceAll('.', '')), 0) * 1000,
							)}
						/>
					</div>
				</div>
				<div class="text-center flex justify-center">
					<div class="w-full max-w-md">
						<Input
							label="Saldo"
							placeholder="100.000,00"
							className="w-full max-w-md"
							type="text"
							disabled
							lead="Rp"
							on:change={handleChange}
							value={formatNumber($user ? $user.wallet.amount : 0)}
						/>
					</div>
				</div>
				<div class="text-center flex justify-center">
					<div class="w-full max-w-md">
						<Input
							label="Sisa Saldo"
							placeholder="100.000,00"
							className="w-full max-w-md"
							type="text"
							disabled
							lead="Rp"
							on:change={handleChange}
							value={$user
								? formatNumber(
										$user.wallet.amount -
											list.reduce((total, l) => total + parseInt($form[l].replaceAll('.', '')), 0) *
												1000,
								  )
								: 0}
						/>
					</div>
				</div>
				{#if error}
					<div class="text-center flex justify-center">
						<span class="ml-px pl-4 text-sm text-red-400">{error}</span>
					</div>
				{/if}
				<div class="text-center mt-4 flex justify-center">
					<Button
						fullWidth={true}
						className="max-w-md"
						type="button"
						loading={$isSubmitting}
						on:click={() =>
							open(Confirm, {
								callback: handleSubmit,
								total: formatNumber(
									list.reduce((total, l) => total + parseInt($form[l].replaceAll('.', '')), 0) *
										1000,
								),
							})}>Beli</Button
					>
				</div>
			</div>
		</form>
	{/if}
</div>
