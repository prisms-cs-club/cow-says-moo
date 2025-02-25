<!-- Author: Ivey Wang -->

<script lang="ts">
	import { onMount } from 'svelte';
	import { Motion } from 'svelte-motion';

	export let albemarle: number;
	export let ettl: number;
	export let hobler: number;
	export let lambert: number;
	export let sortby: string = 'points';
	export let increasing: boolean = false;

	let houses: { name: string; points: number }[] = [
		{ name: 'Albemarle', points: albemarle },
		{ name: 'Ettl', points: ettl },
		{ name: 'Hobler', points: hobler },
		{ name: 'Lambert', points: lambert }
	];
	switch (sortby) {
		case 'points':
			increasing
				? houses.sort((a, b) => a.points - b.points)
				: houses.sort((a, b) => b.points - a.points);
			break;
		case 'name':
			increasing
				? houses.sort((a, b) => a.name.localeCompare(b.name))
				: houses.sort((a, b) => b.name.localeCompare(a.name));
			break;
	}
	let maxPoints = Math.max(...houses.map((house) => house.points)) * 1.1;
</script>

{#each houses as house}
	<div class="na">
		<p class="text">{house.name}</p>
		<Motion animate={{ width: [0, house.points] }} transition={{ duration: 0.75 }} let:motion>
			<div class="progress-{house.name.toLocaleLowerCase()} progress" use:motion></div>
		</Motion>
	</div>
{/each}

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
		height: 2rem;
		border-radius: var(--rounded-box, 1rem);
		/* Default fallback background */
		background-color: oklch(var(--bc) / 0.2);
	}
	.progress-ettl {
		background-color: var(--color-ettl);
	}
	.progress-albemarle {
		background-color: var(--color-albemarle);
	}
	.progress-lambert {
		background-color: var(--color-lambert);
	}
	.progress-hobler {
		background-color: var(--color-hobler);
	}
</style>
