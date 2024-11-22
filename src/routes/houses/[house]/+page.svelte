<script>
	import { onMount } from 'svelte';
	import { load } from './+page';

	export let data;

	onMount(async () => {});
</script>

<h1>House: {data.house}</h1>
