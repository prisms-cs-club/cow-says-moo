<script lang="ts">
	import Calendar from '@event-calendar/core';
	import DayGrid from '@event-calendar/day-grid';
	import { fetchEvents } from '$lib/queryEvents';
	import { onMount } from 'svelte';
	import type { Event } from '$lib/format.d.ts';

	let myEvents: Event[];

	type calendarEvent = {
		title: string;
		start: string;
		end: string;
		extendedProps: {
			description: string;
			tier: number;
			result: string;
			winner: string;
			url: string;
		};
	};

	let calendarEvents: calendarEvent[];

	let plugins = [DayGrid];
	let options: {
		view: string;
		events: calendarEvent[];
		eventClick: (info: any) => void;
	};

	onMount(async () => {
		let events = await fetchEvents();
		calendarEvents = events.map((event: Event) => ({
			title: event.title,
			start: event.dateStart,
			end: event.dateEnd,
			extendedProps: {
				description: event.description,
				tier: event.tier,
				result: event.result,
				winner: event.winner,
				url: `/events/${event.title.toLowerCase().replace(/\s+/g, '-')}`
			}
		}));

		options = {
			view: 'dayGridMonth',
			events: calendarEvents,
			// Make the event clickable: redirect to the URL defined in extendedProps.
			eventClick: function (info) {
				if (info.event.extendedProps.url) {
					window.location.href = info.event.extendedProps.url;
				}
			}
		};

		// force re-render
		// @ts-ignore
		options = options;
	});
</script>

<!-- Render the Calendar component with the defined plugins and options -->
<Calendar {plugins} {options} />
