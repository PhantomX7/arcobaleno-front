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
	import Button from '@components/Button.svelte';

	let list = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'm1', 'm2', 'm3', 'm4', 'm5', 'm6'];
	let deposits;

	const { close } = getContext('simple-modal');
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
			h1: yup.number(),
			h2: yup.number(),
			h3: yup.number(),
			h4: yup.number(),
			h5: yup.number(),
			h6: yup.number(),
			m1: yup.number(),
			m2: yup.number(),
			m3: yup.number(),
			m4: yup.number(),
			m5: yup.number(),
			m6: yup.number(),
		}),
		onSubmit: async (values) => {
			try {
				let formData = new FormData();
				_.forEach(values, function (value, key) {
					formData.append(key, value);
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
			} catch (e) {
				console.log(e);
			}
		},
	});
</script>

<div class="overflow-auto py-4 px-3 w-full">
	<ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each list as l}
			<li class="col-span-1 bg-white rounded-lg shadow-md divide-y divide-gray-200">
				<div class="w-full flex items-center justify-between p-6 space-x-6">
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
								name="amount"
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
								value={formatNumber($form[l] * 1000)}
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
							<span class="">Rp {formatNumber(10000)}</span>
						</div>
					</div>
				</div>
			</li>
		{/each}

		<!-- More people... -->
	</ul>
    <div class="text-center">
        <Button fullWidth={true} type="submit" loading={$isSubmitting}>Beli</Button>
    </div>

</div>
