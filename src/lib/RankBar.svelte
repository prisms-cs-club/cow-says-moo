<script lang="ts">
	import { animate } from 'animejs';

	let windowWidth: number = $state(0);

	let data = $props();
	let albemarle: number = $derived(data.albemarle);
	let ettl: number = $derived(data.ettl);
	let hobler: number = $derived(data.hobler);
	let lambert: number = $derived(data.lambert);

	let houses: { name: string; points: number }[] = $derived([
		{ name: 'Albemarle', points: albemarle },
		{ name: 'Ettl', points: ettl },
		{ name: 'Hobler', points: hobler },
		{ name: 'Lambert', points: lambert }
	]);

	let maxPoints: number = $derived(
		Math.max(Math.max(...houses.map((house) => house.points)) * 1.05, 1)
	);

	let progressBars: (HTMLDivElement | undefined)[] = $state([]);
	let scoreElements: (HTMLDivElement | undefined)[] = $state([]);

	$effect(() => {
		// Wait for all elements to be bound and data to be loaded
		if (progressBars.length === 0 || !houses || houses.length === 0) return;

		// Animate progress bars
		progressBars.forEach((bar, index) => {
			if (bar && houses[index]) {
				const targetWidth = (houses[index].points / maxPoints) * 100;
				animate(bar, {
					width: [`0%`, `${targetWidth}%`],
					duration: 1000,
					easing: 'out(2)'
				});
			}
		});

		// Animate scores
		scoreElements.forEach((score) => {
			if (score) {
				animate(score, {
					opacity: [0, 1],
					translateX: [-60, -30],
					duration: 500,
					delay: 800,
					easing: 'out(2)'
				});
			}
		});
	});
</script>

<svelte:window bind:innerWidth={windowWidth} />
<div class="rank-container">
	{#each houses as house, i}
		<div class="rank-item">
			<div class="house-name">
				{windowWidth <= 480 ? house.name[0] : house.name}
			</div>
			<div class="progress-container">
				<div
					bind:this={progressBars[i]}
					class="progress"
					style:background-color={`var(--color-${house.name.toLowerCase()})`}
					style:width="0%"
				></div>
			</div>
			<div bind:this={scoreElements[i]} class="score" style:opacity="0">
				{house.points}
			</div>
		</div>
	{/each}
</div>

<style>
	.rank-container {
		width: 100%;
		max-width: 900px;
		margin: 0 auto;
		padding: 1rem;
	}

	.rank-item {
		display: flex;
		align-items: center;
		margin-bottom: 1.5rem;
		position: relative;
		height: 3rem;
	}

	.house-name {
		text-align: right;
		padding-right: 1rem;
		font-weight: 600;
		flex-shrink: 0;
	}

	.progress-container {
		flex: 1;
		height: 2rem;
		background-color: oklch(var(--bc) / 0.1);
		border-radius: var(--rounded-box, 1rem);
		overflow: hidden;
		margin: 0 1rem;
		position: relative;
	}

	@media screen and (max-width: 480px) {
		.rank-item {
			height: 2rem;
			font-size: 0.8rem;
		}
		.progress-container {
			height: 1.6rem;
			margin: 0 0.5rem;
		}
	}

	@media screen and (min-width: 480px) {
		.house-name {
			width: 100px;
		}
	}

	.progress {
		height: 100%;
		border-radius: var(--rounded-box, 1rem);
		position: relative;
		overflow: hidden;
	}

	.score {
		width: 60px;
		font-weight: bold;
		text-align: right;
	}
</style>
