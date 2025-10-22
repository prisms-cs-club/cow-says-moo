<script lang="ts">
	import EventGrid from '$lib/EventGrid.svelte';
	import { fetchEventsBetween, queryScoreSummary } from '$lib/firebase';
	import type { HouseEvent } from '$lib/format';
	import RankBar from '$lib/RankBar.svelte';
	import { animate } from 'animejs';
	import { onMount } from 'svelte';

	type scoreSummary = {
		[key: string]: number;
	};

	let scores: scoreSummary = $state({
		albemarle: 0,
		ettl: 0,
		hobler: 0,
		lambert: 0
	});
	let ongoingEvents: HouseEvent[] = $state([]);
	let recentEvents: HouseEvent[] = $state([]);

	// Animation elements
	let titleElement: HTMLHeadingElement | undefined = $state();
	let welcomeText: HTMLParagraphElement | undefined = $state();
	let rankBarContainer: HTMLDivElement | undefined = $state();
	let ongoingSection: HTMLDivElement | undefined = $state();
	let recentSection: HTMLDivElement | undefined = $state();

	$effect.pre(() => {
		(async () => {
			const now = new Date();
			const oneDayAgo = new Date();
			oneDayAgo.setDate(now.getDate() - 1);
			recentEvents = await fetchEventsBetween(oneDayAgo, undefined, 3);
			ongoingEvents = await fetchEventsBetween(now, oneDayAgo);
			scores = await queryScoreSummary();
			console.log('loaded');
		})();
	});

	onMount(() => {
		// Staggered entrance animation for different sections
		if (titleElement) {
			animate(titleElement, {
				translateY: [-30, 0],
				opacity: [0, 1],
				delay: 300,
				duration: 600,
				easing: 'out(2)'
			});
		}

		if (welcomeText) {
			animate(welcomeText, {
				translateY: [-20, 0],
				opacity: [0, 1],
				duration: 700,
				delay: 450,
				easing: 'out(3)'
			});
		}

		if (rankBarContainer) {
			animate(rankBarContainer, {
				translateY: [40, 0],
				opacity: [0, 1],
				duration: 900,
				delay: 300,
				easing: 'out(2)'
			});
		}

		if (ongoingSection) {
			animate(ongoingSection, {
				translateY: [30, 0],
				opacity: [0, 1],
				duration: 800,
				delay: 500,
				easing: 'out(2)'
			});
		}

		if (recentSection) {
			animate(recentSection, {
				translateY: [30, 0],
				opacity: [0, 1],
				duration: 800,
				delay: 650,
				easing: 'out(2)'
			});
		}
	});
</script>

<h1 bind:this={titleElement} style="opacity: 0;">PRISMS - Homepage</h1>
<p bind:this={welcomeText} style="opacity: 0;">
	Welcome to the PRISMS homepage. Here, you will be able to see information about house events.
</p>

<div bind:this={rankBarContainer} style="opacity: 0;">
	<RankBar
		albemarle={scores.albemarle}
		ettl={scores.ettl}
		lambert={scores.lambert}
		hobler={scores.hobler}
	/>
</div>

<div bind:this={ongoingSection} style="opacity: 0;">
	<h2>Ongoing Events</h2>
	{#if ongoingEvents.length === 0}
		<p>No ongoing events at the moment.</p>
	{:else}
		<div class="events-grid">
			<EventGrid events={ongoingEvents} />
		</div>
	{/if}
</div>

<div bind:this={recentSection} style="opacity: 0;">
	<h2>Recent Events</h2>
	{#if recentEvents.length === 0}
		<p>No recent events.</p>
	{:else}
		<div class="events-grid">
			<EventGrid events={recentEvents} />
		</div>
	{/if}
</div>

<style>
	:global(::view-transition-old(root)),
	:global(::view-transition-new(root)) {
		animation: none;
	}

	/* Custom fade animations */
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
