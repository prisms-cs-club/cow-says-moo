<script>
	import { queryHouse } from '$lib/queryHouse';
	import RankBar from '$lib/RankBar.svelte';
	import { onMount } from 'svelte';

	let albemarle = 0;
	let ettl = 0;
	let hobler = 0;
	let lambert = 0;
	let loaded = false;
	onMount(async () => {
		albemarle = (await queryHouse('Albemarle')).points;
		ettl = (await queryHouse('Ettl')).points;
		hobler = (await queryHouse('Hobler')).points;
		lambert = (await queryHouse('Lambert')).points;
		loaded = true;
		console.log('loaded');
	});
</script>

<h1>House Rankings</h1>
<RankBar {albemarle} {ettl} {lambert} {hobler} />

<hr />

<h1>Houses</h1>

<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center;">
	{#each ['Ettl', 'Hobler', 'Albemarle', 'Lambert'] as house}
		<a class="card m-4 bg-base-100 shadow-xl" style="width: 20%" href="/houses/{house}">
			<figure>
				<img src="/image/house-logo/{house.toLowerCase()}/letter.png" alt={house} />
				<!-- TODO: sizes of the 4 images are different. Need to make them the same. -->
			</figure>
			<div class="card-body">
				<h3 class="algerian text-center">{house}</h3>
				<p>House introduction TBD</p>
			</div>
		</a>
	{/each}
</div>
