<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { Event } from '$lib/format';
	import { getMember } from '$lib/queryMember';
	import { fetchEvents, updateEvent, createEvent, deleteEvent } from '$lib/queryEvents';

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

	let loaded = false;

	// Fetch all events on component mount
	onMount(async () => {
		await loadEvents();
		let member = await getMember();

		if (member && member.role === 'admin') {
			displayEventEditor = true;
		}
		loaded = true;
		const interval = setInterval(loadEvents, 5000);
        onDestroy(() => {
            clearInterval(interval);
        });
	});

	
</script>

<div>
	<h1>Events</h1>
	{#if loaded}
		<ul>
			{#each events as event}
				<li><a href="/events/{event.title}">{event.title}</a> - {event.dateStart}</li>
			{/each}
			{#if events.length === 0}
				<p>There is no events yet :&#41;</p>
			{/if}
		</ul>

		{#if displayEventEditor}
			<hr />
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
		{:else}
			<p>you need to be an admin to access the editor</p>
		{/if}
	{:else}
		<p>loading...</p>
		<span class="loading loading-bars loading-lg"></span>
	{/if}
</div>
