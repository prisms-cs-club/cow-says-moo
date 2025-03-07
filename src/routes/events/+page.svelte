<script lang="ts">
	import { onMount } from 'svelte';
	import type { HouseEvent } from '$lib/format';
	import { getMember } from '$lib/queryMember';
	import { fetchEvents, updateEvent, createEvent, deleteEvent } from '$lib/firebase';
	import { Timestamp } from 'firebase/firestore';
	import { formatDate, numberToRoman } from '$lib/utils';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { triggerEasterEgg } from '$lib/stores/strs';

	let events: HouseEvent[] = [];
	let filteredEvents: HouseEvent[] = [];
	let searchQuery = '';
	let eventsPage = 1;
	let totalPage = 1;
	const EVENTS_PER_PAGE = 9;
	let displayEventEditor = false;
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

	const _d = (index: number) => {
		const encodedUrls = [
			'aHR0cHM6Ly9naXRodWIuY29tL255Y3Rpdm9lL2FmcXVlcmlxeXJpcWJmYXMvYmxvYi9tYWluL1BpeFBpbl8yMDI1LTAxLTI2XzE5LTE1LTMzLnBuZz9yYXc9dHJ1ZQ==',
			'aHR0cHM6Ly9naXRodWIuY29tL255Y3Rpdm9lL2FmcXVlcmlxeXJpcWJmYXMvYmxvYi9tYWluLzBiZjA2ZGQ5N2FkMWYxZmM5ZWY1ZWNiNjMwMmQ0OGQxMTM0MDE5MDgyMS5wbmc/cmF3PXRydWU=',
			'aHR0cHM6Ly9naXRodWIuY29tL255Y3Rpdm9lL2FmcXVlcmlxeXJpcWJmYXMvYmxvYi9tYWluL1BpeFBpbl8yMDI1LTAyLTExXzE3LTQ0LTU5LnBuZz9yYXc9dHJ1ZQoK',
			'aHR0cHM6Ly9naXRodWIuY29tL255Y3Rpdm9lL2FmcXVlcmlxeXJpcWJmYXMvYmxvYi9tYWluL1BpeFBpbl8yMDI1LTAyLTExXzE3LTQ2LTA3LnBuZz9yYXc9dHJ1ZQ==',
			'aHR0cHM6Ly9naXRodWIuY29tL255Y3Rpdm9lL2FmcXVlcmlxeXJpcWJmYXMvYmxvYi9tYWluLzM1MGM1NGUzM2MzYTFjZThhOGE4NjM2OTM0M2Q0YmVkMjg2NDMxMDQ1LmpwZz9yYXc9dHJ1ZQ==',
			'aHR0cHM6Ly9naXRodWIuY29tL255Y3Rpdm9lL2FmcXVlcmlxeXJpcWJmYXMvYmxvYi9tYWluL1BpeFBpbl8yMDI1LTAxLTI2XzE5LTE2LTM1LnBuZz9yYXc9dHJ1ZQo=',
			'aHR0cHM6Ly9naXRodWIuY29tL255Y3Rpdm9lL2FmcXVlcmlxeXJpcWJmYXMvYmxvYi9tYWluL1BpeFBpbl8yMDI1LTAxLTI2XzE5LTE2LTQzLnBuZz9yYXc9dHJ1ZQ=='
		];
		return browser ? atob(encodedUrls[index]) : '';
	};

	function checkForEasterEgg(event: KeyboardEvent) {
		if (event.key === 'Enter' && searchQuery === 'qwq') {
			const imageUrl = _d(Math.floor(Math.random() * 7));
			triggerEasterEgg(imageUrl);
			setTimeout(() => {
				searchQuery = '';
			}, 100);
		}
	}

	function filterEvents() {
		if (!searchQuery.trim()) {
			filteredEvents = [...events];
		} else {
			const query = searchQuery.toLowerCase().trim();
			filteredEvents = events.filter(
				(event) =>
					event.title.toLowerCase().includes(query) ||
					event.description.toLowerCase().includes(query)
			);
		}
		totalPage = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);
		eventsPage = 1; // Reset to first page when searching
	}

	$: if (loaded && events) {
		filterEvents();
	}

	$: if (searchQuery !== undefined) {
		filterEvents();
	}

	onMount(async () => {
		events = await fetchEvents();
		filteredEvents = [...events];
		totalPage = Math.ceil(events.length / EVENTS_PER_PAGE);
		let member = await getMember();

		if (member && member.role === 'admin') {
			displayEventEditor = true;
		}
		loaded = true;
	});
</script>

<div class="main-content">
	<div class="header-container">
		<h1>Events</h1>
		<div class="search-container">
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Search events..."
				class="search-input"
				on:keydown={checkForEasterEgg}
			/>
			{#if searchQuery}
				<button class="clear-search" on:click={() => (searchQuery = '')}>×</button>
			{/if}
		</div>
	</div>

	{#if loaded}
		<!-- Display the events list in a grid layout -->
		<div class="events-grid">
			{#each filteredEvents.slice((eventsPage - 1) * EVENTS_PER_PAGE, eventsPage * EVENTS_PER_PAGE) as event, i}
				<div
					class={(event.dateStart.seconds - 432000) * 1000 > Date.now()
						? 'activity upcoming'
						: event.winner
							? `activity ${event.winner.toLowerCase()}`
							: `activity current-event stripe-${i % 4}`}
				>
					<h3 class={event.tier <= 2 ? 'font-bold' : ''}>{event.title}</h3>
					<p>{event.description}</p>
					<p>{formatDate(event)}, Tier {numberToRoman(event.tier)}</p>
					<div class="event-buttons">
						<button class="btn" on:click={() => (window.location.href = '/events/' + event.id)}>
							See More
						</button>
						{#if event.signupLink}
							<button class="btn" on:click={() => window.open(event.signupLink!)}>Sign Up</button>
						{/if}
					</div>
				</div>
			{/each}
		</div>
		<div class="flex">
			<div class="join mx-auto">
				<button
					class="btn join-item"
					on:click={async () => {
						if (eventsPage > 1) {
							eventsPage--;
						}
					}}
				>
					&lt;
				</button>
				{#each Array(totalPage).keys() as page}
					<button
						class={`btn join-item ${page + 1 === eventsPage ? 'btn-active' : ''}`}
						on:click={async () => (eventsPage = page + 1)}
					>
						{page + 1}
					</button>
				{/each}
				<button
					class="btn join-item"
					on:click={async () => {
						if (eventsPage < totalPage) {
							eventsPage++;
						}
					}}
				>
					&gt;
				</button>
			</div>
		</div>
		{#if filteredEvents.length === 0}
			<p class="no-results">
				No matching events found. {#if searchQuery}Try a different search term.{/if}
			</p>
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

	/* Header with search bar */
	.header-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
	}

	.search-container {
		position: relative;
		max-width: 300px;
		width: 100%;
	}

	.search-input {
		border: 2px solid var(--color-nav-bar-bg);
		border-radius: 20px;
		padding: 8px 16px;
		width: 100%;
		font-size: 16px;
		transition: all 0.3s ease;
	}

	.search-input:focus {
		outline: none;
		box-shadow: 0 0 5px rgba(166, 22, 24, 0.5);
	}

	.clear-search {
		position: absolute;
		right: 10px;
		top: 50%;
		transform: translateY(-50%);
		background: none;
		border: none;
		color: var(--color-nav-bar-bg);
		font-size: 20px;
		cursor: pointer;
		padding: 0 5px;
		min-width: auto;
	}

	.clear-search:hover {
		color: #811b1c;
		background: transparent;
	}

	.no-results {
		text-align: center;
		margin-top: 20px;
		color: var(--color-nav-bar-bg);
		font-size: 18px;
	}

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

	button:hover,
	button.btn-active {
		background-color: #811b1c; /* Slightly darker shade */
	}

	.activity {
		margin-top: 0;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: var(--color-event-bg);
		color: var(--color-event-fg);
		font-family: 'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', 'sans-serif';
		border-radius: 8px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		margin-bottom: 20px;
		padding: 16px;
	}

	.activity.current-event.stripe-0 {
		background: linear-gradient(
			135deg,
			var(--color-event-albemarle-bg) 0%,
			var(--color-event-albemarle-bg) 25%,
			var(--color-event-hobler-bg) 25%,
			var(--color-event-hobler-bg) 50%,
			var(--color-event-lambert-bg) 50%,
			var(--color-event-lambert-bg) 75%,
			var(--color-event-ettl-bg) 75%,
			var(--color-event-ettl-bg) 100%
		);
		background-size: 100% 100%;
	}

	.activity.current-event.stripe-1 {
		background: linear-gradient(
			135deg,
			var(--color-event-hobler-bg) 0%,
			var(--color-event-hobler-bg) 25%,
			var (--color-event-lambert-bg) 25%,
			var(--color-event-lambert-bg) 50%,
			var(--color-event-ettl-bg) 50%,
			var(--color-event-ettl-bg) 75%,
			var(--color-event-albemarle-bg) 75%,
			var(--color-event-albemarle-bg) 100%
		);
		background-size: 100% 100%;
	}

	.activity.current-event.stripe-2 {
		background: linear-gradient(
			135deg,
			var(--color-event-lambert-bg) 0%,
			var(--color-event-lambert-bg) 25%,
			var(--color-event-ettl-bg) 25%,
			var(--color-event-ettl-bg) 50%,
			var(--color-event-albemarle-bg) 50%,
			var(--color-event-albemarle-bg) 75%,
			var(--color-event-hobler-bg) 75%,
			var(--color-event-hobler-bg) 100%
		);
		background-size: 100% 100%;
	}

	.activity.current-event.stripe-3 {
		background: linear-gradient(
			135deg,
			var(--color-event-ettl-bg) 0%,
			var(--color-event-ettl-bg) 25%,
			var(--color-event-albemarle-bg) 25%,
			var(--color-event-albemarle-bg) 50%,
			var(--color-event-hobler-bg) 50%,
			var(--color-event-hobler-bg) 75%,
			var(--color-event-lambert-bg) 75%,
			var(--color-event-lambert-bg) 100%
		);
		background-size: 100% 100%;
	}

	.activity.current-event p,
	.activity.current-event h3 {
		background-color: rgba(255, 255, 255, 0);
		padding: 5px;
		border-radius: 4px;
	}

	.activity.upcoming {
		background-color: var(--color-event-upcoming-bg);
		color: var (--color-event-upcoming-fg-1);
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
		min-width: 100px; /* Ensure buttons have consistent width */
		text-align: center; /* Center text within buttons */
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
		color: var (--color-event-ettl-bg);
	}

	.activity.hobler button {
		background-color: var(--color-event-hobler-fg);
		color: var(--color-event-hobler-bg);
	}

	.activity button:hover {
		background-color: #811b1c;
	}

	.activity button:focus {
		outline: none;
	}

	.events-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.event-buttons {
		margin-top: auto;
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		justify-content: center;
		padding: 10px 0;
		margin-bottom: 8px;
	}

	@media (max-width: 640px) {
		.events-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (min-width: 641px) and (max-width: 1024px) {
		.events-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1025px) {
		.events-grid {
			grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		}
	}

	@media (max-width: 640px) {
		.header-container {
			flex-direction: column;
			align-items: flex-start;
			gap: 10px;
		}

		.search-container {
			max-width: 100%;
		}
	}

	.main-content {
		position: relative;
		min-height: 400px;
	}
</style>
