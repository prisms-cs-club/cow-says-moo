<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import type { HouseEvent } from '$lib/format';
    import { getMember } from '$lib/queryMember';
    import { fetchEvents, updateEvent, createEvent, deleteEvent } from '$lib/queryEvents';
	import { Timestamp } from 'firebase/firestore';
	import { formatDate } from '$lib/utils';
    import { page } from '$app/stores';

    let events: HouseEvent[] = [];
    let eventsPage = 1;
    let totalPage = 1;
    const EVENTS_PER_PAGE = 8;
    let displayEventEditor = false; // Only display event editor if the user's role is admin
    let newEvent: HouseEvent = {
        id: '',
        title: '',
        dateStart: new Timestamp(0, 0),
        dateEnd: new Timestamp(0, 0),
        description: '',
        tier: 0
    };

    let eventToUpdate: HouseEvent = {
        id: '',
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
        events = await fetchEvents();
        totalPage = Math.ceil(events.length / EVENTS_PER_PAGE);
        let member = await getMember();

        if (member && member.role === 'admin') {
            displayEventEditor = true;
        }
        loaded = true;

        // Auto-refresh events every 5 seconds (I'm afraid of running out of query limits)
        // const interval = setInterval(fetchEvents, 5000);
        // onDestroy(() => {
        //     clearInterval(interval);
        // });
    });
</script>

<div>
    <h1>Events</h1>
    {#if loaded}
        <!-- Display the events list -->
        {#each events.slice((eventsPage - 1) * EVENTS_PER_PAGE, eventsPage * EVENTS_PER_PAGE) as event}
            <div class={(event.dateStart.seconds - 432000) * 1000 > Date.now() ? 'activity upcoming' : `activity ${event.winner?.toLowerCase() ?? ''}`}>
                <h3 class={(event.tier >= 3) ? "font-bold" : ""}>{event.title}</h3>
                <p>{event.description}</p>
                <p>{formatDate(event)}</p>
                <button 
                    class="btn" 
                    on:click={() => window.location.href = '/events/' + event.id}>
                    See More
                </button>
            </div>
        {/each}
        <div class="flex">
            <div class="join mx-auto">
                <button
                    class="join-item btn"
                    on:click={async () => {
                        if (eventsPage > 1) {
                            eventsPage--;
                        }
                    }}>
                    &lt;
                </button>
                {#each Array(totalPage).keys() as page}
                    <button
                        class={`join-item btn ${page + 1 === eventsPage ? 'btn-active' : ''}`}
                        on:click={async () => eventsPage = page + 1}>
                        {page + 1}
                    </button>
                {/each}
                <button
                    class="join-item btn"
                    on:click={async () => {
                        if (eventsPage < totalPage) {
                            eventsPage++;
                        }
                    }}>
                    &gt;
                </button>
            </div>
        </div>
        {#if events.length === 0}
            <p>There are no events yet. :(</p>
        {/if}

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
        --light-beige-pink: #fae5e1;
        --color-event-bg: #f8f8f8;
        --color-event-fg: #3f361e;
        --color-event-fg-2: #5c5445;
        --color-event-upcoming-bg: #e5e5e5;
        --color-event-upcoming-fg-1: #0b0a0a;
        --color-event-upcoming-fg-2: #9a9a9a;
        --color-event-albemarle-bg: #fff9ba;
        --color-event-albemarle-fg: #6e6503;
        --color-event-lambert-bg: #dae4f8;
        --color-event-lambert-fg: #194c7c;
        --color-event-ettl-bg: #e6f7d2;
        --color-event-ettl-fg: #0a6a0a;
        --color-event-hobler-bg: #f5cccc;
        --color-event-hobler-fg: #800f11;
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

    button {
        background-color: var(--color-nav-bar-bg);
        color: var(--color-nav-bar-fg);
        padding: 8px 16px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    button:hover, button.btn-active {
        background-color: #811b1c; /* Slightly darker shade */
    }

    .activity {
        margin-top: 20px;
        padding: 20px;
        background-color: var(--color-event-bg);
        color: var(--color-event-fg);
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
    }

    .activity.upcoming {
        background-color: var(--color-event-upcoming-bg); /* Light gray background */
        color: var(--color-event-upcoming-fg-1); /* gray text */
    }

    .activity.albemarle {
        background-color: var(--color-event-albemarle-bg);
        color: var(--color-event-albemarle-fg);
    }

    .activity.lambert {
        background-color: var(--color-event-lambert-bg);
        color: var(--color-event-lambert-fg);
    }

    .activity.ettl {
        background-color: var(--color-event-ettl-bg);
        color: var(--color-event-ettl-fg);
    }

    .activity.hobler {
        background-color: var(--color-event-hobler-bg);
        color: var(--color-event-hobler-fg);
    }

    .activity h3 {
        font-size: 1.5rem;
        margin-bottom: 10px;
    }

    .activity p {
        margin-bottom: 10px;
    }

    .activity button {
        background-color: var(--color-event-fg-2);
        color: var(--color-event-bg);
        padding: 10px 15px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .activity.upcoming button {
        background-color: var(--color-event-upcoming-fg-2);
        color: var(--color-event-upcoming-bg);
    }

    .activity.albemarle button {
        background-color: var(--color-event-albemarle-fg);
        color: var(--color-event-albemarle-bg);
    }

    .activity.lambert button {
        background-color: var(--color-event-lambert-fg);
        color: var(--color-event-lambert-bg);
    }

    .activity.ettl button {
        background-color: var(--color-event-ettl-fg);
        color: var(--color-event-ettl-bg);
    }

    .activity.hobler button {
        background-color: var(--color-event-hobler-fg);
        color: var(--color-event-hobler-bg);
    }

    .activity button:hover {
        background-color: #811b1c; /* Slightly darker red */
    }

    .activity button:focus {
        outline: none;
    }
</style>
