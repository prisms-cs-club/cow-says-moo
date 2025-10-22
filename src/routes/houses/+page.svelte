<script lang="ts">
	import { queryScoreSummary } from '$lib/firebase';
	import RankBar from '$lib/RankBar.svelte';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { animate } from 'animejs';
	import { onMount } from 'svelte';
	import { beforeNavigate } from '$app/navigation';

	type scoreSummary = {
		[key: string]: number;
	};

	let scores: scoreSummary = $state({
		albemarle: 0,
		ettl: 0,
		hobler: 0,
		lambert: 0
	});

	// Animation elements
	let titleElement: HTMLHeadingElement | undefined = $state();
	let rankBarContainer: HTMLDivElement | undefined = $state();
	let housesTitle: HTMLHeadingElement | undefined = $state();
	let housesGrid: HTMLDivElement | undefined = $state();

	$effect.pre(() => {
		(async () => {
			scores = await queryScoreSummary();
			console.log('loaded');
		})();
	});

	onMount(() => {
		// Entrance animations
		if (titleElement) {
			animate(titleElement, {
				translateY: [-30, 0],
				opacity: [0, 1],
				duration: 800,
				easing: 'out(3)'
			});
		}

		if (rankBarContainer) {
			animate(rankBarContainer, {
				translateY: [40, 0],
				opacity: [0, 1],
				duration: 800,
				delay: 300,
				easing: 'out(2)'
			});
		}

		if (housesTitle) {
			animate(housesTitle, {
				translateY: [-20, 0],
				opacity: [0, 1],
				duration: 700,
				delay: 400,
				easing: 'out(3)'
			});
		}

		if (housesGrid) {
			animate(housesGrid, {
				translateY: [30, 0],
				opacity: [0, 1],
				duration: 800,
				delay: 550,
				easing: 'out(2)'
			});
		}
	});
</script>

<h1 bind:this={titleElement} style="opacity: 0;">House Rankings</h1>
<div bind:this={rankBarContainer} style="opacity: 0;">
	<RankBar
		albemarle={scores.albemarle}
		ettl={scores.ettl}
		lambert={scores.lambert}
		hobler={scores.hobler}
	/>
</div>

<hr />

<h1 bind:this={housesTitle} style="opacity: 0;">Houses</h1>

<div bind:this={housesGrid} class="flex flex-row flex-wrap justify-center" style="opacity: 0;">
	{#each ['albemarle', 'ettl', 'hobler', 'lambert'] as house}
		<a class="m-4 w-full sm:w-64" href="/houses/{house}" data-sveltekit-preload-data>
			<Card class="shadow-xl transition-transform hover:scale-105">
				<figure class="p-4">
					<img
						src="/image/house-logo/{house}/letter.png"
						alt={house}
						class="h-48 w-full object-contain"
					/>
				</figure>
				<CardContent class="pb-4">
					<h3 class="algerian text-center text-xl">{house.toUpperCase()}</h3>
					<!-- <p>House introduction TBD</p> -->
				</CardContent>
			</Card>
		</a>
	{/each}
</div>

<style>
	/* View Transitions API Animations for Houses Page */

	/* Disable default root animations */
	:global(::view-transition-old(root)),
	:global(::view-transition-new(root)) {
		animation: none;
	}

	/* Custom fade animations for houses page */
	@keyframes fade-out {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	/* Apply fade animations to root */
	:global(::view-transition-old(root)) {
		animation: 300ms cubic-bezier(0.4, 0, 1, 1) both fade-out;
	}

	:global(::view-transition-new(root)) {
		animation: 400ms cubic-bezier(0, 0, 0.2, 1) both fade-in;
	}
</style>
