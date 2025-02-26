<script lang="ts">
	import { Motion } from 'svelte-motion';

	let windowWidth: number;

	export let albemarle: number;
	export let ettl: number;
	export let hobler: number;
	export let lambert: number;
	export let sortby: string = 'points';
	export let increasing: boolean = false;

	let houses: { name: string; points: number }[] = [];
	let maxPoints: number;

	$: {
		houses = [
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

		maxPoints = Math.max(...houses.map((house) => house.points)) * 2.0;
	}
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class="rank-container">
	{#each houses as house}
		<div class="rank-item">
			<div class="house-name">{house.name}</div>
			<div class="progress-container">
				<Motion
					animate={{ width: [0, house.points * (windowWidth / maxPoints)] }}
					transition={{ duration: 1.0 }}
					let:motion
				>
					<div class="progress-{house.name.toLocaleLowerCase()} progress" use:motion></div>
				</Motion>
			</div>
			<Motion
				animate={{ opacity: [0, 1], x: [-60, -30] }}
				transition={{ delay: 0.8, duration: 0.5 }}
				let:motion
			>
				<div class="score" use:motion>{house.points}</div>
			</Motion>
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
		width: 100px;
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

	.progress {
		height: 100%;
		border-radius: var(--rounded-box, 1rem);
		position: relative;
		overflow: hidden;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	}

	.progress-shine {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 40%;
		background: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));
	}

	.score {
		width: 60px;
		font-weight: bold;
		text-align: right;
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
