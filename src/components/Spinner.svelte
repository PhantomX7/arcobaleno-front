<script>
	export let color = '#FFF';
	export let unit = 'px';
	export let duration = '1s';
	export let size = '15';
	let durationUnit = duration.match(/[a-zA-Z]/)[0];
	let durationNum = duration.replace(/[a-zA-Z]/, '');
	const range = (size, startAt = 0) => [...Array(size).keys()].map((i) => i + startAt);
</script>

<style>
	.circle {
	  height: var(--size);
	  width: var(--size);
	  border-color: var(--color) transparent var(--color) var(--color);
	  border-width: calc(var(--size) / 10);
	  border-style: solid;
	  border-image: initial;
	  border-radius: 50%;
	  animation: var(--duration) linear 0s infinite normal none running rotate;
	}
	@keyframes rotate {
	  0% {
		transform: rotate(0);
	  }
	  100% {
		transform: rotate(360deg);
	  }
	}
  </style>
  
  <div
	class="circle"
	style="--size: {size}{unit}; --color: {color}; --duration: {duration}" />