<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { Event, Member } from '$lib/format';
	import { page } from '$app/state';
	import { getMember } from '$lib/queryMember';
	import { fetchEvents, fetchEventById, updateEvent, createEvent, deleteEvent } from '$lib/queryEvents';

	let events: Event[] = [];
	let displayEventEditor = false; // Only display event editor if the user's role is admin
	let newEvent: Event = {
		title: '',
		dateStart: '',
		dateEnd: '',
		description: '',
		tier: 0
		// result: null,
		// winner: null
	};
	let eventToUpdate: Event = {
		title: '',
		dateStart: '',
		dateEnd: '',
		description: '',
		tier: 0
		// result: null,
		// winner: null
	};
	let deleteEventId = '';

	async function loadEvents() {
        events = [...await fetchEvents()];
    }

	// Fetch all events on component mount
	onMount(async () => {
		await loadEvents();
		let member = await getMember();

		if (member && member.role === 'admin') {
			displayEventEditor = true;
		}

		const interval = setInterval(loadEvents, 1000);

        onDestroy(() => {
            clearInterval(interval);
        });
	});

	
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
		<button on:click={() => createEvent(newEvent)}>Create</button>

		<h2>Update Event</h2>
		<input type="text" bind:value={eventToUpdate.title} placeholder="Event Title" />
		<input type="date" bind:value={eventToUpdate.dateStart} placeholder="Start Date" />
		<input type="date" bind:value={eventToUpdate.dateEnd} placeholder="End Date" />
		<input type="text" bind:value={eventToUpdate.description} placeholder="Description" />
		<input type="number" bind:value={eventToUpdate.tier} placeholder="Tier" />
		<button on:click={() => updateEvent(eventToUpdate)}>Update</button>

		<h2>Delete Event</h2>
		<input type="text" bind:value={deleteEventId} placeholder="Event ID" />
		<button on:click={() => deleteEvent(deleteEventId)}>Delete</button>
	{/if}
</div>
