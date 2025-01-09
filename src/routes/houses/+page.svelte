<script>
	import { queryHouse } from '$lib/queryHouse';
	import RankBar from '$lib/RankBar.svelte';
	import { onMount } from 'svelte';
	import RedirectButton from '$lib/redirectButton.svelte';
	
	let albemarle = 0;
	let ettl = 0;
	let hobler = 0;
	let lambert = 0;
	let loaded = false;
	onMount(async () => {
		albemarle = (await queryHouse('albemarle')).points;
		ettl = (await queryHouse('ettl')).points;
		hobler = (await queryHouse('hobler')).points;
		lambert = (await queryHouse('lambert')).points;
		loaded = true;
		console.log("loaded");
	});
</script>

<h1>Go to house: </h1>
<RedirectButton name="Ettl" target="houses/ettl" />
<RedirectButton name="Hobler" target="houses/hobler" />
<RedirectButton name="Albemarle" target="houses/albemarle" />
<RedirectButton name="Lambert" target="houses/lambert" />

<hr />

<h1>House Rankings</h1>
{#if loaded}
	<RankBar albemarle={albemarle} ettl={ettl} lambert={lambert} hobler={hobler}  />
{:else}
	<span class="loading loading-bars loading-lg"></span>
{/if}
