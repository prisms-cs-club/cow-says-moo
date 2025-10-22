<script lang="ts">
	import type { HouseEvent } from '$lib/format';
	import { fetchEvents, fetchUpdateTime } from '$lib/firebase';
	import { Timestamp } from 'firebase/firestore';
	import { formatDate, numberToRoman } from '$lib/houseEventUtils';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { triggerEasterEgg } from '$lib/stores/strs';
	import EventGrid from '$lib/EventGrid.svelte';
	import SearchIcon from '$lib/icon/Search.svelte';
	import CancelIcon from '$lib/icon/Cancel.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { animate } from 'animejs';

	let events: HouseEvent[] = $state([]);
	let filteredEvents: HouseEvent[] = $state([]);
	let searchQuery = $state('');
	let eventsPage = $state(1);
	let totalPage = $state(1);
	const EVENTS_PER_PAGE = 12;
	let loaded = $state(false);
	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	// Animation elements
	let headerContainer: HTMLDivElement | undefined = $state();
	let eventGridContainer: HTMLDivElement | undefined = $state();
	let paginationContainer: HTMLDivElement | undefined = $state();

	const _d = (index: number) => {
		const _e = [
			'/image/footer/PixPin_2025-01-26_19-15-33-b450cfc8.png',
			'/image/footer/PixPin_2025-01-26_19-16-35-e4ecaee9.png',
			'/image/footer/PixPin_2025-01-26_19-16-43-9f2af5e9.png',
			'/image/footer/PixPin_2025-02-11_17-44-59-7c8eeb98.png',
			'/image/footer/furina-b7335471.png'
		];
		return _e[Math.floor(Math.random() * _e.length)];
	};

	function checkForEasterEgg(event: KeyboardEvent) {
		if (event.key === 'Enter' && searchQuery === 'qwq') {
			const imageUrl = _d(Math.floor(Math.random() * 5));
			triggerEasterEgg(imageUrl);

			// Clear any existing timeout
			if (timeoutId !== null) {
				clearTimeout(timeoutId);
			}

			timeoutId = setTimeout(() => {
				searchQuery = '';
				timeoutId = null;
			}, 100);
		}
	}

	function filterEvents() {
		// Compute filtered list locally to avoid reading a state we also write
		// within the same effect (which would cause an infinite loop with $effect).
		const query = searchQuery.toLowerCase().trim();
		const nextFiltered = !query
			? [...events]
			: events.filter(
					(event) =>
						event.title.toLowerCase().includes(query) ||
						(event.description ?? '').toLowerCase().includes(query)
				);

		filteredEvents = nextFiltered;
		totalPage = Math.ceil(nextFiltered.length / EVENTS_PER_PAGE);
		eventsPage = 1; // Reset to first page when searching
	}

	$effect(() => {
		if (loaded && events) {
			console.log('active');
			filterEvents();
		}
	});

	$effect(() => {
		// Run animations when content is loaded
		if (loaded) {
			// Staggered entrance animation for different sections
			if (headerContainer) {
				animate(headerContainer, {
					translateY: [-30, 0],
					opacity: [0, 1],
					duration: 800,
					delay: 200,
					easing: 'out(3)'
				});
			}

			if (eventGridContainer) {
				animate(eventGridContainer, {
					translateY: [40, 0],
					opacity: [0, 1],
					duration: 900,
					delay: 400,
					easing: 'out(2)'
				});
			}

			if (paginationContainer) {
				animate(paginationContainer, {
					translateY: [20, 0],
					opacity: [0, 1],
					duration: 800,
					delay: 600,
					easing: 'out(2)'
				});
			}
		}
	});

	$effect.pre(() => {
		(async () => {
			events = await fetchEvents();
			filteredEvents = [...events];
			totalPage = Math.ceil(events.length / EVENTS_PER_PAGE);
			loaded = true;

			let updateTime = await fetchUpdateTime();
			console.log(updateTime);
			console.log(events);
		})();

		// Cleanup function to clear timeout when component unmounts
		return () => {
			if (timeoutId !== null) {
				clearTimeout(timeoutId);
				timeoutId = null;
			}
		};
	});
</script>

<div class="main-content">
	<div class="header-container" bind:this={headerContainer} style="opacity: 0;">
		<div class="page-title">Events</div>
		<div class="search-container">
			<div class="search-input flex items-center gap-1 pr-2">
				<div class="pl-3 text-[var(--color-theme-1)]">
					<SearchIcon class="inline-svg" size="1.2em" />
				</div>
				<Input
					type="text"
					bind:value={searchQuery}
					placeholder="Search events..."
					class="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
					onkeydown={checkForEasterEgg}
				/>
				{#if searchQuery}
					<Button
						variant="ghost"
						size="icon"
						class="h-8 w-8 hover:bg-transparent"
						onclick={() => (searchQuery = '')}
					>
						<CancelIcon class="inline-svg" size="1em" />
					</Button>
				{/if}
			</div>
		</div>
	</div>

	{#if loaded}
		<div bind:this={eventGridContainer} style="opacity: 0;">
			<EventGrid
				events={filteredEvents.slice(
					(eventsPage - 1) * EVENTS_PER_PAGE,
					eventsPage * EVENTS_PER_PAGE
				)}
			/>
		</div>
		<div class="flex" bind:this={paginationContainer} style="opacity: 0;">
			<div class="mx-auto flex items-center gap-1">
				<Button
					variant="outline"
					size="sm"
					onclick={async () => {
						if (eventsPage > 1) {
							eventsPage--;
						}
					}}
				>
					&lt;
				</Button>
				{#each Array(totalPage).keys() as page (page)}
					<Button
						variant={page + 1 === eventsPage ? 'default' : 'outline'}
						size="sm"
						onclick={async () => (eventsPage = page + 1)}
					>
						{page + 1}
					</Button>
				{/each}
				<Button
					variant="outline"
					size="sm"
					onclick={async () => {
						if (eventsPage < totalPage) {
							eventsPage++;
						}
					}}
				>
					&gt;
				</Button>
			</div>
		</div>
		{#if filteredEvents.length === 0}
			<p class="no-results">
				No matching events found. {#if searchQuery}Try a different search term.{/if}
			</p>
		{/if}
	{:else}
		<div class="flex flex-col items-center gap-4">
			<p>Loading...</p>
			<div
				class="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"
			></div>
		</div>
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

	.page-title {
		font-size: 2rem;
		font-weight: bold;
		color: var(--color-theme-1);
	}

	.search-container {
		position: relative;
		max-width: 400px;
		width: 100%;
	}

	.search-input {
		border-radius: 20px;
		padding: 8px 4px;
		width: 100%;
		font-size: 16px;
		transition: all 0.2s ease;
		background-color: white;
		outline: 2px solid rgba(166, 22, 24, 0.15);
		outline-offset: 2px;
		box-shadow: 0 0 0px rgba(166, 22, 24, 0);
	}

	.search-input:focus-within {
		outline-color: rgba(166, 22, 24, 0.8);
		outline-offset: 3px;
	}

	.no-results {
		text-align: center;
		margin-top: 20px;
		color: var(--color-theme-1);
		font-size: 18px;
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

	:global(::view-transition-old(root)),
	:global(::view-transition-new(root)) {
		animation: none;
	}

	/* Custom fade animations */
	@keyframes fade-out {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	/* Apply fade animations to root */
	:global(::view-transition-old(root)) {
		animation: 300ms cubic-bezier(0.4, 0, 1, 1) both fade-out;
	}

	:global(::view-transition-new(root)) {
		animation: 400ms cubic-bezier(0, 0, 0.2, 1) both fade-in;
	}
</style>
