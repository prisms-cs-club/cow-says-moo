<script lang="ts">
	import { onMount } from 'svelte';
	import type { HouseEvent } from '$lib/format';
	import { fetchEvents, fetchUpdateTime } from '$lib/firebase';
	import { Timestamp } from 'firebase/firestore';
	import { formatDate, numberToRoman } from '$lib/utils';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { triggerEasterEgg } from '$lib/stores/strs';
	import EventGrid from '$lib/EventGrid.svelte';
	import SearchIcon from '$lib/icon/Search.svelte';
	import CancelIcon from '$lib/icon/Cancel.svelte';

	let events: HouseEvent[] = [];
	let filteredEvents: HouseEvent[] = [];
	let searchQuery = '';
	let eventsPage = 1;
	let totalPage = 1;
	const EVENTS_PER_PAGE = 9;
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
		loaded = true;

		let updateTime = await fetchUpdateTime();
		console.log(updateTime);
		console.log(events);
	});
</script>

<div class="main-content">
	<div class="header-container">
		<h1>Events</h1>
		<div class="search-container">
			<div class="search-input join">
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search events..."
					class="join"
					on:keydown={checkForEasterEgg}
				/>
				<button class="join" style:display="inline"
					><SearchIcon class="inline-svg" size="1em" /></button
				>
				{#if searchQuery}
					<button class="join" style:display="inline-block" on:click={() => (searchQuery = '')}
						><CancelIcon class="inline-svg" size="1em" /></button
					>
				{/if}
			</div>
		</div>
	</div>

	{#if loaded}
		<EventGrid
			events={filteredEvents.slice(
				(eventsPage - 1) * EVENTS_PER_PAGE,
				eventsPage * EVENTS_PER_PAGE
			)}
		/>
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
	{:else}
		<p>Loading...</p>
		<span class="loading loading-bars loading-lg"></span>
	{/if}
</div>

<style>
	/* Using the provided color scheme */

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
		border: 2px solid var(--color-theme-1);
		color: var(--color-theme-1);
		border-radius: 20px;
		padding: 0 10px;
		width: 100%;
		font-size: 16px;
		transition: all 0.3s ease;
	}

	.search-input input {
		border: none;
		padding: 8px;
		margin: 0;
		outline: none;
		background: #00000000;
		width: 100%;
	}

	.search-input button {
		padding: 8px;
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
		min-width: auto;
		font-size: 20px;
	}

	.no-results {
		text-align: center;
		margin-top: 20px;
		color: var(--color-theme-1);
		font-size: 18px;
	}

	.loading {
		color: var(--color-theme-1);
	}

	button.btn-active {
		background-color: #9b2a24e8; /* Slightly darker shade */
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
