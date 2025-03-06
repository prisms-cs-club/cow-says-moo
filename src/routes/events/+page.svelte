<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import type { HouseEvent } from '$lib/format';
    import { getMember } from '$lib/queryMember';
    import { fetchEvents, updateEvent, createEvent, deleteEvent } from '$lib/queryEvents';
	import { Timestamp } from 'firebase/firestore';
	import { formatDate } from '$lib/utils';

    let events: HouseEvent[] = [];
    let displayEventEditor = false; // Only display event editor if the user's role is admin
    let newEvent: HouseEvent = {
        title: '',
        dateStart: new Timestamp(0, 0),
        dateEnd: new Timestamp(0, 0),
        description: '',
        tier: 0
    };

    let eventToUpdate: HouseEvent = {
        title: '',
        dateStart: new Timestamp(0, 0),
        dateEnd: new Timestamp(0, 0),
        description: '',
        tier: 0
    };

    let deleteEventId = '';
    let loaded = false;

    // Fetch all events on component mount
    onMount(async () => {
        await loadEvents();
        let member = await getMember();

        if (member && member.role === 'admin') {
            displayEventEditor = true;
        }
        loaded = true;

        // Auto-refresh events every 5 seconds
        const interval = setInterval(loadEvents, 5000);
        onDestroy(() => {
            clearInterval(interval);
        });
    });

    async function loadEvents() {
        events = [...await fetchEvents()];
    }
</script>

<div>
    <h1>Events</h1>
    {#if loaded}
        <!-- Display the events list -->
        <ul>
            {#each events as event}
                <li>
                    <a href="/events/{event.title}">{event.title}</a> - { formatDate(event) } (Tier {event.tier})
                    <!-- Display the event description below the event title -->
                    <p>{event.description}</p>
                </li>
            {/each}
            {#if events.length === 0}
                <p>There are no events yet. :(</p>
            {/if}
        </ul>

        <!-- Admin event editor section -->
        {#if displayEventEditor}
            <hr />
            <h3>Create Event</h3>
            <input type="text" bind:value={newEvent.title} placeholder="Event Title" />
            <input type="date" bind:value={newEvent.dateStart} placeholder="Start Date" />
            <input type="date" bind:value={newEvent.dateEnd} placeholder="End Date" />
            <input type="text" bind:value={newEvent.description} placeholder="Description" />
            <input type="number" bind:value={newEvent.tier} placeholder="Tier" />
            <button on:click={() => createEvent(newEvent)}>Create</button>

            <h3>Update Event</h3>
            <input type="text" bind:value={eventToUpdate.title} placeholder="Event Title" />
            <input type="date" bind:value={eventToUpdate.dateStart} placeholder="Start Date" />
            <input type="date" bind:value={eventToUpdate.dateEnd} placeholder="End Date" />
            <input type="text" bind:value={eventToUpdate.description} placeholder="Description" />
            <input type="number" bind:value={eventToUpdate.tier} placeholder="Tier" />
            <button on:click={() => updateEvent(eventToUpdate)}>Update</button>

            <h3>Delete Event</h3>
            <input type="text" bind:value={deleteEventId} placeholder="Event ID" />
            <button on:click={() => deleteEvent(deleteEventId)}>Delete</button>
        {:else}
            <p>You need to be an admin to access the event editor.</p>
        {/if}
    {:else}
        <p>Loading...</p>
        <span class="loading loading-bars loading-lg"></span>
    {/if}
</div>

<style>
    /* Using the provided color scheme */
    :root {
        --color-nav-bar-bg: #a61618;
        --color-nav-bar-fg: #facec5;
    }

    /* Updated loading color */
    .loading {
        color: var(--color-nav-bar-bg);
    }

    h1 {
        color: var(--color-nav-bar-bg);
    }

    hr {
        margin-top: 20px;
        margin-bottom: 20px;
        border: 1px solid var(--color-nav-bar-bg);
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin-bottom: 10px;
        font-size: 1.2rem;
    }

    li a {
        color: var(--color-nav-bar-bg);
        text-decoration: none;
    }

    li a:hover {
        text-decoration: underline;
    }

    .input {
        margin: 5px 0;
    }

    button {
        background-color: var(--color-nav-bar-bg);
        color: var(--color-nav-bar-fg);
        padding: 8px 16px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: #811b1c; /* Slightly darker shade */
    }
</style>
