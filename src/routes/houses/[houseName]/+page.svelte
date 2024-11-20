<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let houseName = '';
	onMount(() => {
		const unsubscribe = page.subscribe((value) => {
			houseName = value.params.houseName;
		});
		return unsubscribe;
	});
</script>

<h1>HEHEHEHA {houseName}</h1>
