<script lang="ts">
	import { queryScoreSummary } from '$lib/firebase';
	import RankBar from '$lib/RankBar.svelte';
	import { onMount } from 'svelte';

	type scoreSummary = {
		[key: string]: number;
	};

	let scores: scoreSummary = {
		albemarle: 0,
		ettl: 0,
		hobler: 0,
		lambert: 0
	};

	onMount(async () => {
		scores = await queryScoreSummary();
		console.log('loaded');
	});
</script>

<h1>House Rankings</h1>
<RankBar
	albemarle={scores.albemarle}
	ettl={scores.ettl}
	lambert={scores.lambert}
	hobler={scores.hobler}
/>

<hr />

<h1>Houses</h1>

<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center;">
	{#each ['albemarle', 'ettl', 'hobler', 'lambert'] as house}
		<a
			class="card m-4 bg-base-100 shadow-xl"
			style="width: 20%"
			href="/houses/{house}"
			data-sveltekit-preload-data
		>
			<figure>
				<img src="/image/house-logo/{house}/letter.png" alt={house} />
			</figure>
			<div class="card-body">
				<h3 class="algerian text-center">{house.toUpperCase()}</h3>
				<!-- <p>House introduction TBD</p> -->
			</div>
		</a>
	{/each}
</div>
