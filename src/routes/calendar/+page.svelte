<script lang="ts">
	import daygridPlugin from '@fullcalendar/daygrid';
	import FullCalendar from 'svelte-fullcalendar';
	import interactionPlugin from '@fullcalendar/interaction';
	import { onMount } from 'svelte';

	import type { Event } from '$lib/format.d.ts';

	let events: Event[] = [];
	let calendarEvents = [{ title: '', date: '' }];

	onMount(async () => {
		await fetchEvents();
	});

	async function fetchEvents() {
		try {
			const response = await fetch('/api/events', {
				method: 'GET'
			});
			if (!response.ok) {
				throw new Error('Failed to fetch events');
			}
			events = await response.json();

			calendarEvents = events.map((event) => {
				return {
					title: event.title,
					date: event.dateStart
				};
			});
		} catch (error) {
			console.error(error);
		}
	}

	let options = {
		events: calendarEvents,
		initialView: 'dayGridMonth',
		schedulerLicenseKey: 'XXX',
		plugins: [interactionPlugin, daygridPlugin],
		droppable: true,
		height: '660px'
	};

	$: options = { ...options, events: calendarEvents };
</script>

<div class="small-calendar"><FullCalendar {options} /></div>

<style>
	.small-calendar {
		width: 100%;
	}
</style>
