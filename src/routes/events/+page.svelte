<!-- Author: Benjamin Zhao

<script></script>

	I removed your page header here, since we decided to use Addison's header
		--Tom Geng 

<div id="frame">
	<div id="kickball_frame" class="event_frame">
		<a href="/events/kickball">go to kickball</a>
	</div>
</div>

<style>
	#frame {
		background-color: #f8f8f8;
		overflow: auto;
		height: 100vh;
		width: 100%;
	}
	#kickball_frame {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.event_frame {
		height: 320px;
		width: 60%;
	}
</style> -->

<script lang="ts">
	import { onMount } from 'svelte';
	import type { Event } from '$lib/format.d.ts';

	let events: Event[] = [];
	let newEvent: Partial<Event> = {
		title: '',
		dateStart: '',
		dateEnd: '',
		description: '',
		tier: 0,
		result: null,
		winner: null
	};
	let updateEvent: Partial<Event> = {
		title: '',
		dateStart: '',
		dateEnd: '',
		description: '',
		tier: 0,
		result: null,
		winner: null
	};
	let deleteEventId = '';

	// Fetch all events on component mount
	onMount(async () => {
		await fetchEvents();
	});

	async function fetchEvents() {
		try {
			const response = await fetch('/api/events');
			if (!response.ok) {
				throw new Error('Failed to fetch events');
			}
			const data: Event[] = await response.json();
			events = [...data]; // Reassign to trigger reactivity
		} catch (error) {
			console.error(error);
		}
	}

	async function fetchEventById(id: string) {
		try {
			const response = await fetch(`/api/events?id=${id}`);
			if (!response.ok) {
				throw new Error('Failed to fetch event');
			}
			const event: Event = await response.json();
			console.log(event);
		} catch (error) {
			console.error(error);
		}
	}

	async function createEvent() {
		try {
			const response = await fetch('/api/events', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newEvent)
			});
			if (!response.ok) {
				throw new Error('Failed to create event');
			}
			const result: Event = await response.json();
			console.log(result);
			await fetchEvents();
		} catch (error) {
			console.error(error);
		}
	}

	async function updateEventById() {
		try {
			const response = await fetch('/api/events', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(updateEvent)
			});
			if (!response.ok) {
				throw new Error('Failed to update event');
			}
			const result: Event = await response.json();
			console.log(result);
			await fetchEvents();
		} catch (error) {
			console.error(error);
		}
	}

	async function deleteEventById() {
		try {
			const response = await fetch(`/api/events?id=${deleteEventId}`, {
				method: 'DELETE'
			});
			if (!response.ok) {
				throw new Error('Failed to delete event');
			}
			const result = await response.json();
			console.log(result);
			await fetchEvents();
		} catch (error) {
			console.error(error);
		}
	}
</script>

<div>
	<h1>Events</h1>
	<ul>
		{#each events as event}
			<li>{event.title} - {event.dateStart}</li>
		{/each}
	</ul>

	<h2>Create Event</h2>
	<input type="text" bind:value={newEvent.title} placeholder="Event Title" />
	<input type="date" bind:value={newEvent.dateStart} placeholder="Start Date" />
	<input type="date" bind:value={newEvent.dateEnd} placeholder="End Date" />
	<input type="text" bind:value={newEvent.description} placeholder="Description" />
	<input type="number" bind:value={newEvent.tier} placeholder="Tier" />
	<button on:click={createEvent}>Create</button>

	<h2>Update Event</h2>
	<input type="text" bind:value={updateEvent.title} placeholder="Event Title" />
	<input type="date" bind:value={updateEvent.dateStart} placeholder="Start Date" />
	<input type="date" bind:value={updateEvent.dateEnd} placeholder="End Date" />
	<input type="text" bind:value={updateEvent.description} placeholder="Description" />
	<input type="number" bind:value={updateEvent.tier} placeholder="Tier" />
	<button on:click={updateEventById}>Update</button>

	<h2>Delete Event</h2>
	<input type="text" bind:value={deleteEventId} placeholder="Event ID" />
	<button on:click={deleteEventById}>Delete</button>
</div>
