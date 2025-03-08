<script lang="ts">
	import EventGrid from "$lib/EventGrid.svelte";
	import { fetchEventsBetween, queryScoreSummary } from "$lib/firebase";
	import type { HouseEvent } from "$lib/format";
	import { formatDate, numberToRoman } from "$lib/utils";
	import RankBar from '$lib/RankBar.svelte';
	import { onMount } from "svelte";

	type scoreSummary = {
		[key: string]: number;
	};

	let scores: scoreSummary = {
		albemarle: 0,
		ettl: 0,
		hobler: 0,
		lambert: 0
	};
	let ongoingEvents: HouseEvent[] = [];
	let recentEvents: HouseEvent[] = [];

	onMount(async () => {
    	const now = new Date();
    	const oneDayAgo = new Date();
    	oneDayAgo.setDate(now.getDate() - 1);
		recentEvents = await fetchEventsBetween(oneDayAgo, undefined, 3);
		ongoingEvents = await fetchEventsBetween(now, oneDayAgo);
		scores = await queryScoreSummary();
		console.log('loaded');
	});
</script>

<h1>PRISMS International News - Homepage</h1>
<p>
	Welcome to the PRISMS International News homepage. You will be able to see information about house
	events.
</p>

<RankBar
	albemarle={scores.albemarle}
	ettl={scores.ettl}
	lambert={scores.lambert}
	hobler={scores.hobler}
/>

<h2>Ongoing Events</h2>
{#if ongoingEvents.length === 0}
	<p>No ongoing events at the moment.</p>
{:else}
	<div class="events-grid">
		<EventGrid events={ongoingEvents} />
	</div>
{/if}

<h2>Recent Events</h2>
{#if recentEvents.length === 0}
	<p>No recent events.</p>
{:else}
	<div class="events-grid">
		<EventGrid events={recentEvents} />
	</div>
{/if}