<script lang="ts">
	import type { HouseEvent } from '$lib/format';
	import { formatDate, numberToRoman } from '$lib/utils';

	export let events: HouseEvent[];
</script>

<div class="events-grid">
	{#each events as event, i}
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
				<button class="event-btn btn btn-sm">
					<a href={'/events/' + event.id} data-sveltekit-preload-data>See More</a>
				</button>
				{#if event.signupLink}
					<button class="event-btn btn btn-sm" on:click={() => window.open(event.signupLink!)}
						>Sign Up</button
					>
				{/if}
			</div>
		</div>
	{/each}
</div>

<style>
	:root {
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
		border: 2px solid var(--color-theme-1);
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

	h1 {
		color: var(--color-theme-1);
	}

	hr {
		margin-top: 20px;
		margin-bottom: 20px;
		border: 1px solid var(--color-theme-1);
	}

	button.btn-active {
		background-color: #9b2a24e8; /* Slightly darker shade */
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
		min-width: 100px;
		text-align: center;
	}

	.activity button.event-btn {
		min-width: 100px;
		text-align: center;
		box-shadow: 0 3px 4px rgba(0, 0, 0, 0);
		transition: all 0.2s ease;
		border: none;
	}

	.activity button.event-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 6px rgba(110, 110, 110, 0.4);
	}

	.activity button.event-btn:active {
		transform: translateY(1px);
		box-shadow: 0 2px 3px rgba(110, 110, 110, 0.2);
	}

	.activity.upcoming button.event-btn {
		background-color: var(--color-event-upcoming-fg-2);
		color: var(--color-event-upcoming-bg);
	}

	.activity.albemarle button.event-btn {
		background-color: var(--color-event-albemarle-fg);
		color: var(--color-event-albemarle-bg);
	}

	.activity.lambert button.event-btn {
		background-color: var(--color-event-lambert-fg);
		color: var(--color-event-lambert-bg);
	}

	.activity.ettl button.event-btn {
		background-color: var(--color-event-ettl-fg);
		color: var(--color-event-ettl-bg);
	}

	.activity.hobler button.event-btn {
		background-color: var(--color-event-hobler-fg);
		color: var(--color-event-hobler-bg);
	}

	.activity.current-event button.event-btn {
		background-color: var(--color-event-fg-2);
		color: white;
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
</style>
