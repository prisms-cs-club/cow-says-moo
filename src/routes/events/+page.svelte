<script lang="ts">
	import { onMount } from 'svelte';
	import type { Event, Member } from '$lib/format.d.ts';
	import { page } from '$app/state';

	let events: Event[] = [];
	let displayEventEditor = false;   // Only display event editor if the user's role is admin
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
		if(page.data.session && page.data.session.user) {
			let member: Member | null = await (await fetch("/api/member?email=" + page.data.session.user.email)).json();
			if(member && member.role === "admin") {
				displayEventEditor = true;
			}
		}
	});

	async function fetchEvents() {
		try {
			const response = await fetch('/api/event', {
				method: 'GET'
			});
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
			const response = await fetch(`/api/event?id=${id}`, {
				method: 'GET'
			});
			if (!response.ok) {
				throw new Error('Failed to fetch event');
			}
			const event: Event = await response.json();
		} catch (error) {
			console.error(error);
		}
	}

	async function createEvent() {
		try {
			const response = await fetch('/api/event', {
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
			await fetchEvents();
		} catch (error) {
			console.error(error);
		}
	}

	async function updateEventById() {
		try {
			const response = await fetch('/api/event', {
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
			await fetchEvents();
		} catch (error) {
			console.error(error);
		}
	}

	async function deleteEventById() {
		try {
			const response = await fetch(`/api/event?id=${deleteEventId}`, {
				method: 'DELETE'
			});
			if (!response.ok) {
				throw new Error('Failed to delete event');
			}
			const result = await response.json();
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
			<li><a href="/events/{event.title}">{event.title}</a> - {event.dateStart}</li>
		{/each}
	</ul>

	{#if displayEventEditor}
		<!-- Only display event editor when `displayEventEditor` flag is true -->
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
	{/if}
</div>
