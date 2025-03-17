<script lang="ts">
	import type { HouseEvent } from '$lib/format';
	import { formatDate, numberToRoman } from '$lib/utils';

	export let events: HouseEvent[];

	function genEventBtnStyle(status: string) {
		return `background-color: var(--color-event-${status}-fg); color: var(--color-event-${status}-bg);`;
	}

	function genActivityPanelStyle(status: string) {
		if(status !== 'current-event') {
			return `background-color: var(--color-event-${status}-bg); color: var(--color-event-${status}-fg);`;
		} else {
			return `color: var(--color-event-current-event-fg)`;
		}
	}
</script>

<div class="events-grid">
	{#each events as event, i}
		{@const eventStarted = (event.dateStart.seconds - 432000) * 1000 > Date.now()}
		{@const status = event.winner?.toLowerCase() ?? (eventStarted ? 'upcoming' : 'current-event')}
		<div
			class={`activity ${status} ${(status == 'current-event') ? 'stripe-' + (i % 4) : ''}`}
			style={genActivityPanelStyle(status)}
		>
			<h3 class={event.tier <= 2 ? 'font-bold' : ''}>{event.title}</h3>
			<p>{event.description}</p>
			<p>{formatDate(event)}, Tier {numberToRoman(event.tier)}</p>
			<div class="event-buttons">
				<button class="btn btn-sm event-btn" style={genEventBtnStyle(status)}>
					<a href={'/events/' + event.id} data-sveltekit-preload-data>See More</a>
				</button>
				{#if event.signupLink}
					<button class="btn btn-sm event-btn" style={genEventBtnStyle(status)} on:click={() => window.open(event.signupLink!)}
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
		--color-event-current-event-bg: #f8f8f8;
		--color-event-current-event-fg: #5c5445;
		--color-event-upcoming-bg: #e5e5e5;
		--color-event-upcoming-fg: #585858;
		--color-event-albemarle-bg: #fff9ba;
		--color-event-albemarle-fg: #6e6503;
		--color-event-lambert-bg: #dae4f8;
		--color-event-lambert-fg: #194c7c;
		--color-event-ettl-bg: #e6f7d2;
		--color-event-ettl-fg: #0a6a0a;
		--color-event-hobler-bg: #f5cccc;
		--color-event-hobler-fg: #800f11;
	}

	.activity {
		margin-top: 0;
		height: 100%;
		display: flex;
		flex-direction: column;
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
			var(--color-event-lambert-bg) 25%,
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
