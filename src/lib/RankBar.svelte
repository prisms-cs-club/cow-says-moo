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
	<div class="na">
		<p class="text">Ettl</p>
		<progress class="progress-ettl progress w-56" value={ettl.points} max={maxPoints}></progress>
	</div>

	<div class="na">
		<p class="text">Hobler</p>
		<progress class="progress-hobler progress w-56" value={hobler.points} max={maxPoints}
		></progress>
	</div>

	<div class="na">
		<p class="text">Albemarle</p>
		<progress class="progress-albemarle progress w-56" value={albemarle.points} max={maxPoints}
		></progress>
	</div>

	<div class="na">
		<p class="text">Lambert</p>
		<progress class="progress-lambert progress w-56" value={lambert.points} max={maxPoints}
		></progress>
	</div>
{:else}
	<span class="loading loading-bars loading-lg"></span>
{/if}

<style>
	.text {
		top: 30px;
		position: relative;
		left: 5px;
	}
	.progress {
		position: relative;
		width: 80%;
		left: 10%;
		height: 2rem /* 8px */;
		border-radius: var(--rounded-box, 1rem);
		background-color: var(--fallback-bc, oklch(var(--bc) / 0.2));
	}
	.progress::-moz-progress-bar {
		border-radius: var(--rounded-box, 1rem /* 16px */);
		--tw-bg-opacity: 1;
		background-color: var(--fallback-bc, oklch(var(--bc) / var(--tw-bg-opacity)));
	}
	:root {
		--color-albemarle: #ede625;
		--color-ettl: #26be3a;
		--color-hobler: #fa4242;
		--color-lambert: #4270fa;
	}
	.progress-ettl::-moz-progress-bar {
		border-radius: var(--rounded-box, 1rem);
		--tw-bg-opacity: 1;
		background-color: var(--color-ettl);
	}
	.progress-ettl:indeterminate {
		--progress-color: var(--color-ettl);
	}
	.progress-ettl::-webkit-progress-value {
		--tw-bg-opacity: 1;
		background-color: var(--color-ettl);
	}

	.progress-albemarle::-moz-progress-bar {
		border-radius: var(--rounded-box, 1rem);
		--tw-bg-opacity: 1;
		background-color: var(--color-albemarle);
	}
	.progress-albemarle:indeterminate {
		--progress-color: var(--color-albemarle);
	}
	.progress-albemarle::-webkit-progress-value {
		--tw-bg-opacity: 1;
		background-color: var(--color-albemarle);
	}
	.progress-lambert::-moz-progress-bar {
		border-radius: var(--rounded-box, 1rem);
		--tw-bg-opacity: 1;
		background-color: var(--color-lambert);
	}
	.progress-lambert:indeterminate {
		--progress-color: var(--color-lambert);
	}
	.progress-lambert::-webkit-progress-value {
		--tw-bg-opacity: 1;
		background-color: var(--color-lambert);
	}
	.progress-hobler::-moz-progress-bar {
		border-radius: var(--rounded-box, 1rem);
		--tw-bg-opacity: 1;
		background-color: var(--color-hobler);
	}
	.progress-hobler:indeterminate {
		--progress-color: var(--color-hobler);
	}
	.progress-hobler::-webkit-progress-value {
		--tw-bg-opacity: 1;
		background-color: var(--color-hobler);
	}
	.loading-bars {
		display: block;
		width: 80px;
		height: 80px;
		position: relative;
	}
</style>
