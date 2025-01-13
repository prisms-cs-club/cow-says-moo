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

<h1>House Rankings</h1>
{#if loaded}
	<RankBar albemarle={albemarle} ettl={ettl} lambert={lambert} hobler={hobler}  />
{:else}
	<span class="loading loading-bars loading-lg"></span>
{/if}

<hr />

<h1>Houses</h1>

<div style="display: flex; flex-direction: row; flex-wrap: wrap;">
	{#each ['Ettl', 'Hobler', 'Albemarle', 'Lambert'] as house}
	<a class="card bg-base-100 shadow-xl m-4" style="width: 20%" href="/houses/{house.toLowerCase()}">
		<figure>
		  <img
			src="/image/house-logo/{house.toLowerCase()}/letter.png"
			alt="{house}" />
			<!-- TODO: sizes of the 4 images are different. Need to make them the same. -->
		</figure>
		<div class="card-body">
			<h2>{house}</h2>
		  	<p>House introduction TBD</p>
		</div>
	  </a>
	{/each}
</div>