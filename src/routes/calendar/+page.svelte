<script lang="ts">
	import Calendar from '@event-calendar/core';
	import DayGrid from '@event-calendar/day-grid';
	import TimeGrid from '@event-calendar/time-grid';
	import Interaction from '@event-calendar/interaction';
	import { fetchEvents } from '$lib/firebase';
	import { onMount } from 'svelte';
	import type { HouseEvent } from '$lib/format.d.ts';
	import { numberToRoman } from '$lib/utils';
	import { goto } from '$app/navigation'; // Import SvelteKit's navigation function

	let calendarEvents = [];
	let plugins = [DayGrid, TimeGrid, Interaction];
	let options: object;
	let tooltip: HTMLElement;
	let tooltipContent: string = '';
	let tooltipVisible = false;

	const baseOptions = {
		view: 'dayGridMonth',
		headerToolbar: {
			start: 'prev,next today',
			center: 'title',
			end: 'dayGridMonth,timeGridWeek'
		},
		eventClick: function (info: any) {
			if (info.event.extendedProps.url) {
				goto(info.event.extendedProps.url);
			} else if (info.event.url) {
				goto(info.event.url);
			}
		},

		eventMouseEnter: function (info: any) {
			const { event } = info;
			const props = event.extendedProps;
			const eventEl = info.el;

			let winner = '',
				points = 0;

			if (props.winner !== null) {
				winner = props.winner;
				points = props.result?.[props.winner.toLowerCase()] || 0;
			} else {
				winner = 'Not available';
				points = 0;
			}

			tooltipContent = `
                <div class="tooltip-title">${event.title}</div>
                <div class="tooltip-time">${formatDateTime(event.start)} - ${formatDateTime(event.end)}</div>
                ${props.description ? `<div class="tooltip-desc">${props.description}</div>` : ''}
                ${props.tier ? `<div class="tooltip-tier">Tier: ${numberToRoman(props.tier)}</div>` : ''}
                ${props.result ? `<div class="tooltip-result-${winner.toLowerCase()}">Winner: ${winner} with ${points} points </div>` : ''}
            `;

			const rect = eventEl.getBoundingClientRect();
			const scrollTop = window.scrollY || document.documentElement.scrollTop;
			const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

			tooltip.innerHTML = tooltipContent;
			tooltip.style.visibility = 'hidden';
			tooltipVisible = true;

			setTimeout(() => {
				let left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + scrollLeft;
				let top = rect.bottom - 110 + scrollTop;
				tooltip.style.left = `${left}px`;
				tooltip.style.top = `${top}px`;
				tooltip.style.visibility = 'visible';
			}, 0);
		},

		eventMouseLeave: function () {
			tooltipVisible = false;
		}
	};

	function formatDateTime(date: Date): string {
		return date.toLocaleString('en-US', {
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: '2-digit'
		});
	}

	onMount(async () => {
		let events = await fetchEvents();
		calendarEvents = events.map((event: HouseEvent) => {
			let eventColor = '';

			if (event.winner?.toLocaleLowerCase() === 'albemarle') {
				eventColor = 'var(--color-albemarle)';
			} else if (event.winner?.toLowerCase() === 'lambert') {
				eventColor = 'var(--color-lambert)';
			} else if (event.winner?.toLowerCase() === 'ettl') {
				eventColor = 'var(--color-ettl)';
			} else if (event.winner?.toLowerCase() === 'hobler') {
				eventColor = 'var(--color-hobler)';
			} else {
				eventColor = 'var(--color-event-upcoming-fg-2)';
			}

			return {
				title: event.title,
				start: event.dateStart.toDate().toISOString(),
				end: event.dateEnd.toDate().toISOString(),
				color: eventColor,
				extendedProps: {
					description: event.description,
					tier: event.tier,
					result: event.result,
					winner: event.winner,
					url: `/events/${event.id}`
				}
			};
		});

		options = {
			...baseOptions,
			events: calendarEvents
		};
	});
</script>

<div class="calendar-container">
	{#if options}
		<Calendar {plugins} {options} />
	{:else}
		<div class="loading-container">
			<p>Loading calendar...</p>
		</div>
	{/if}
</div>

<div class="event-tooltip" bind:this={tooltip} class:visible={tooltipVisible}></div>

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

	.calendar-container {
		align-self: center;
		height: 100%;
		width: 100%;
		margin: 0 auto;
		padding: 1rem;
		border-radius: 8px;
		background-color: white;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}

	.loading-container {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	:global(.ec-event) {
		border-radius: 4px;
		padding: 4px 8px;
		margin-left: 3px;
		transition: all 0.2s ease;
	}

	:global(.ec-event:hover) {
		transform: scale(1.02);
		box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
		z-index: 10;
	}

	.event-tooltip {
		position: absolute;
		display: none;
		background-color: white;
		border-radius: 4px;
		padding: 8px 12px;
		box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
		z-index: 1000;
		max-width: 300px;
	}

	.event-tooltip.visible {
		display: block;
	}

	:global(.tooltip-title) {
		font-weight: bold;
	}

	:global(.tooltip-time) {
		font-size: 0.9em;
		color: #666;
	}

	:global(.tooltip-desc) {
		font-size: 0.9em;
	}

	:global(.tooltip-tier) {
		font-size: 0.9em;
	}

	:global(.tooltip-result-albemarle) {
		font-size: 0.9em;
		color: var(--color-albemarle);
	}

	:global(.tooltip-result-lambert) {
		font-size: 0.9em;
		color: var(--color-lambert);
	}

	:global(.tooltip-result-ettl) {
		font-size: 0.9em;
		color: var(--color-ettl);
	}

	:global(.tooltip-result-hobler) {
		font-size: 0.9em;
		color: var(--color-hobler);
	}
</style>
