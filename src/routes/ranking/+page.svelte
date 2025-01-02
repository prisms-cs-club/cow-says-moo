<script>
	import { queryHouse } from '$lib/queryHouse';
	import RankBar from '$lib/RankBar.svelte';
	import { onMount } from 'svelte';
	
	let albemarle = 0;
	let ettl = 0;
	let hobler = 0;
	let lambert = 0;
	let shown = false;
	onMount(async () => {
		albemarle = (await queryHouse('albemarle')).points;
		ettl = (await queryHouse('ettl')).points;
		hobler = (await queryHouse('hobler')).points;
		lambert = (await queryHouse('lambert')).points;
		shown = true;
	});
</script>

<h1>House Rankings</h1>
{#if shown}
	<RankBar albemarle={albemarle} ettl={ettl} lambert={lambert} hobler={hobler}  />
{:else}
	<span class="loading loading-bars loading-lg"></span>
{/if}
