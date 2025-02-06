<script lang="ts">
	import daygridPlugin from '@fullcalendar/daygrid';
	import FullCalendar from 'svelte-fullcalendar';
	import interactionPlugin from '@fullcalendar/interaction';
	import { onMount } from 'svelte';

	import type { Event } from '$lib/format.d.ts';

	let events: Event[] = [];
	let calendarEvents: { title: string; date: string }[] = [];

	onMount(async () => {
		await fetchEvents();
	});

	async function fetchEvents() {
		try {
			const response = await fetch('/api/event', {
				method: 'GET'
			});
			if (!response.ok) {
				throw new Error('Failed to fetch events');
			}
			events = await response.json();

			calendarEvents = events.map((event) => ({
				title: event.title,
				date: event.dateStart
			}));
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
		height: '660px',
		themeSystem: 'bootstrap5'
	};

	$: options = { ...options, events: JSON.parse(JSON.stringify(calendarEvents)) };
</script>

<div class="calendar-container p-6 bg-white shadow-2xl rounded-xl border border-gray-200">
	<FullCalendar {options} />
</div>

<style>
	.calendar-container {
		max-width: 1000px;
		margin: 20px auto;
		background: linear-gradient(135deg, #f8fafc, #e2e8f0);
		border-radius: 12px;
		padding: 20px;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
	}

	.fc {
		font-family: 'Inter', sans-serif;
		color: #1e293b;
	}

	.fc-daygrid-event {
		background-color: #2563eb !important;
		color: white !important;
		border-radius: 8px;
		padding: 6px 10px;
		font-weight: 500;
	}

	.fc-toolbar-title {
		font-size: 1.75rem;
		font-weight: 700;
		color: #334155;
	}

	.fc-button {
		background: #2563eb !important;
		border: none !important;
		color: white !important;
		border-radius: 6px !important;
		padding: 6px 12px !important;
		transition: all 0.3s ease-in-out;
	}

	.fc-button:hover {
		background: #1e40af !important;
	}
</style>