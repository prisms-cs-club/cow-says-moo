<!-- Author: Ivey Wang -->

<script lang="ts">
	import { onMount } from 'svelte';
	import type { House } from './format';
	import { queryHouse } from '$lib/queryHouse';

	let ettl: House = { name: '', description: '', points: 0 };
	let hobler: House = { name: '', description: '', points: 0 };
	let albemarle: House = { name: '', description: '', points: 0 };
	let lambert: House = { name: '', description: '', points: 0 };
	let maxPoints = 100;
	let shown = false;
	onMount(async () => {
		await fetchScores();
	});

	async function fetchScores() {
		try {
			ettl = await queryHouse('ettl');
			hobler = await queryHouse('hobler');
			albemarle = await queryHouse('albemarle');
			lambert = await queryHouse('lambert');
			maxPoints =
				Math.max(Math.max(ettl.points, hobler.points), Math.max(albemarle.points, lambert.points)) *
				1.1;
			shown = true;
		} catch (error) {
			console.error(error);
		}
	}
</script>

<h1>House Points</h1>
{#if shown}
	<p>
		<progress class="progress progress-success w-56" value={ettl.points} max={maxPoints}></progress>
	</p>
	<p>
		<progress class="progress progress-error w-56" value={hobler.points} max={maxPoints}></progress>
	</p>
	<p>
		<progress class="progress progress-warning w-56" value={albemarle.points} max={maxPoints}
		></progress>
	</p>
	<p>
		<progress class="progress progress-info w-56" value={lambert.points} max={maxPoints}></progress>
	</p>
{:else}
	<span class="loading loading-bars loading-lg"></span>
{/if}

<style>
	.progress {
		position: relative;
		width: 80%;
		left: 10%;
		appearance: none;
		overflow: hidden;
		height: 2.5rem;
		border-radius: var(--rounded-box, 1rem);
		background-color: var(--fallback-bc, oklch(var(--bc) / 0.1));
	}
	.progress-success::-moz-progress-bar {
		background-color: var(--fallback-su, oklch(var(--su) / 1));
	}
</style>
