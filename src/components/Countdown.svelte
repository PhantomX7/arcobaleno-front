<script>
	import { onMount } from 'svelte';

	import { browser } from '$app/env';

	export let offset = new Date();

	onMount(() => {
		// create a ticker on an element with options
		if (browser) {
			let element = document.querySelector('#ticker');

			let tick = Tick.DOM.create(element, {
				value: 1000,
				view:
					// definition for top level tick element
					{
						children: [
							// presenter object
							{
								root: 'div',
								layout: 'horizontal fit',
								// transform: 'preset(h, m, s)',
								children: [
									{
										key: 'hour',
										root: 'span',
										repeat: 'true',
										transform: 'pad(00)',
										style: 'background_color: #fff',
										view: 'flip',
										// transform: 'pad(00) -> split -> delay',
									},
									{
										key: 'sep',
										root: 'span',
										view: 'text',
										// transform: 'pad(00) -> split -> delay',
									},
									{
										key: 'minute',
										root: 'span',
										repeat: 'true',
										transform: 'pad(00)',
										view: 'flip',
										// transform: 'pad(00) -> split -> delay',
									},
									{
										key: 'sep',
										root: 'span',
										view: 'text',
										// transform: 'pad(00) -> split -> delay',
									},
									{
										key: 'second',
										root: 'span',
										repeat: 'true',
										transform: 'pad(00)',
										view: 'flip',
										// transform: 'pad(00) -> split -> delay',
									},
								],
							},
						],
					},

				didInit: function (tick) {
					let timeDuration = Tick.helper.duration(10, 'seconds');
					// add 24 hours to get final deadline
					let deadline = new Date(offset.setMilliseconds(offset.getMilliseconds() + timeDuration));
					// create counter
					let counter = Tick.count.down(deadline, { format: ['h', 'm', 's'] });
					// update tick with the counter value
					counter.onupdate = function (value) {
						tick.value = {
							hour: value[0],
							minute: value[1],
							second: value[2],
							sep: ':',
						};
					};
					counter.onended = function () {
						window.location.reload();
					};
				},
			});
			// function handleTickInit(tick) {
			// 	console;
			// 	// get timer offset (if not found, set to today)

			// }
		}
	});
</script>

<div id="ticker" class="tick max-w-md w-full" />

<style>
</style>
