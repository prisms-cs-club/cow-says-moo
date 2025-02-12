<!-- Author: Ivey Wang -->

<script lang="ts">
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
		<progress
			class="progress-{house.name.toLocaleLowerCase()} progress"
			value={house.points}
			max={maxPoints}
		></progress>
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
		height: 2rem /* 8px */;
		border-radius: var(--rounded-box, 1rem);
		background-color: var(--fallback-bc, oklch(var(--bc) / 0.2));
	}
	.progress::-moz-progress-bar {
		border-radius: var(--rounded-box, 1rem /* 16px */);
		--tw-bg-opacity: 1;
		background-color: var(--fallback-bc, oklch(var(--bc) / var(--tw-bg-opacity)));
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
