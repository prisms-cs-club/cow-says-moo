<script lang="ts">
	import Calendar from '@event-calendar/core';
	import DayGrid from '@event-calendar/day-grid';
	import TimeGrid from '@event-calendar/time-grid'; // Add this for better time display
	import Interaction from '@event-calendar/interaction'; // Add for better interaction
	import { fetchEvents } from '$lib/firebase';
	import { onMount } from 'svelte';
	import type { HouseEvent } from '$lib/format.d.ts';

	let calendarEvents = [];
	let plugins = [DayGrid, TimeGrid, Interaction];
	let options: object;

	onMount(async () => {
		let events = await fetchEvents();
		calendarEvents = events.map((event: HouseEvent) => ({
			title: event.title,
			start: event.dateStart.toDate().toISOString(), // Convert Timestamp to Date first
			end: event.dateEnd.toDate().toISOString(), // Convert Timestamp to Date first
			extendedProps: {
				description: event.description,
				tier: event.tier,
				result: event.result,
				winner: event.winner,
				url: `/events/${event.id}`
			}
		}));

		options = {
			view: 'dayGridMonth',
			events: calendarEvents,
			headerToolbar: {
				start: 'prev,next today',
				center: 'title',
				end: 'dayGridMonth,timeGridWeek'
			},
			eventClick: function (info: any) {
				if (info.event.extendedProps.url) {
					window.location.href = info.event.extendedProps.url;
				}
			},
			eventDisplay: 'block', // Makes events more visible
			eventTimeFormat: {
				hour: 'numeric',
				minute: '2-digit',
				meridiem: 'short'
			}
		};
	});
</script>

<div class="calendar-container">
	{#if options}
		<Calendar {plugins} {options} />
	{:else}
		<p>Loading calendar...</p>
	{/if}
</div>

<style>
	.calendar-container {
		height: 800px;
		max-width: 1200px;
		margin: 0 auto;
		padding: 1rem;
	}
</style>
