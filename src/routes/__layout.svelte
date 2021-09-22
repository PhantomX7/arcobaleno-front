<script>
	import '../app.postcss';
	import Modal from 'svelte-simple-modal';
	import Nav from '@components/Nav.svelte';
</script>

<Modal>
    <Nav />
	<slot />
</Modal>
