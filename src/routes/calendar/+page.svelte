<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchEvents } from '$lib/firebase';
	import type { HouseEvent } from '$lib/format.d.ts';
	import { numberToRoman } from '$lib/houseEventUtils';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	// Import types only
	import type Calendar from '@toast-ui/calendar';
	import type { Options } from '@toast-ui/calendar';

	type ToastCalendarEvent = {
		id: string;
		calendarId: string;
		title: string;
		start: Date;
		end: Date;
		category: 'allday' | 'time';
		isAllday: boolean;
		backgroundColor: string;
		borderColor: string;
		color: string;
		raw: {
			description?: string;
			tier?: number;
			result?: Record<string, number>;
			winner?: string;
			url: string;
		};
	};

	const calendarId = 'house-events';

	let calendarContainer: HTMLDivElement;
	let calendarInstance: Calendar | null = null;
	let calendarEvents: ToastCalendarEvent[] = [];

	let isLoading = $state(true);
	let currentView = $state<'month' | 'week'>('month');
	let calendarTitle = $state('');
	let tooltip: HTMLElement;
	let tooltipVisible = $state(false); // tooltip does not work properly...

	const baseOptions: Options = {
		defaultView: 'month',
		usageStatistics: false,
		isReadOnly: true,
		useFormPopup: false,
		useDetailPopup: false,
		calendars: [
			{
				id: calendarId,
				name: 'House Events',
				backgroundColor: '#e5e5e5',
				borderColor: '#e5e5e5'
			}
		],
		month: {
			startDayOfWeek: 0,
			dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
		},
		week: {
			startDayOfWeek: 0,
			dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			eventView: true,
			taskView: false
		}
	};

	function getEventStyles(winner?: string | null) {
		if (!winner) {
			return {
				backgroundColor: 'var(--color-event-upcoming-bg)',
				borderColor: 'var(--color-event-upcoming-bg)',
				color: 'var(--color-event-upcoming-fg-1)'
			};
		}

		switch (winner.toLowerCase()) {
			case 'albemarle':
				return {
					backgroundColor: 'var(--color-event-albemarle-bg)',
					borderColor: 'var(--color-event-albemarle-bg)',
					color: 'var(--color-event-albemarle-fg)'
				};
			case 'lambert':
				return {
					backgroundColor: 'var(--color-event-lambert-bg)',
					borderColor: 'var(--color-event-lambert-bg)',
					color: 'var(--color-event-lambert-fg)'
				};
			case 'ettl':
				return {
					backgroundColor: 'var(--color-event-ettl-bg)',
					borderColor: 'var(--color-event-ettl-bg)',
					color: 'var(--color-event-ettl-fg)'
				};
			case 'hobler':
				return {
					backgroundColor: 'var(--color-event-hobler-bg)',
					borderColor: 'var(--color-event-hobler-bg)',
					color: 'var(--color-event-hobler-fg)'
				};
			default:
				return {
					backgroundColor: 'var(--color-event-upcoming-bg)',
					borderColor: 'var(--color-event-upcoming-bg)',
					color: 'var(--color-event-upcoming-fg-1)'
				};
		}
	}

	function mapEvent(event: HouseEvent): ToastCalendarEvent {
		const start = event.dateStart.toDate();
		const end = event.dateEnd.toDate();

		// Check if this is an all-day event (no specific time set)
		const hasTime =
			start.getHours() !== 0 ||
			start.getMinutes() !== 0 ||
			end.getHours() !== 0 ||
			end.getMinutes() !== 0;

		const styles = getEventStyles(event.winner ?? null);

		return {
			id: event.id,
			calendarId,
			title: event.title,
			start: start,
			end: end,
			isAllday: !hasTime,
			category: hasTime ? 'time' : 'allday',
			backgroundColor: styles.backgroundColor,
			borderColor: styles.borderColor,
			color: styles.color,
			raw: {
				description: event.description,
				tier: event.tier,
				result: event.result,
				winner: event.winner,
				url: `/events/${event.id}`
			}
		};
	}

	function formatWeekRange(start: Date, end: Date) {
		const sameMonth = start.getMonth() === end.getMonth();
		const sameYear = start.getFullYear() === end.getFullYear();

		const startLabel = start.toLocaleString('en-US', {
			month: sameMonth ? 'long' : 'short',
			day: 'numeric'
		});

		const endLabel = end.toLocaleString('en-US', {
			month: 'short',
			day: 'numeric',
			year: sameYear ? undefined : 'numeric'
		});

		const yearLabel = sameYear ? `, ${start.getFullYear()}` : '';

		return `${startLabel} - ${endLabel}${yearLabel}`;
	}

	function updateCalendarTitle() {
		if (!calendarInstance) {
			return;
		}

		const viewName = calendarInstance.getViewName();
		if (viewName === 'month' || viewName === 'week') {
			currentView = viewName;
		}

		if (viewName === 'month') {
			const currentDate = calendarInstance.getDate().toDate();
			calendarTitle = currentDate.toLocaleString('en-US', {
				month: 'long',
				year: 'numeric'
			});
			return;
		}

		const rangeStart = calendarInstance.getDateRangeStart().toDate();
		const rangeEnd = calendarInstance.getDateRangeEnd().toDate();
		calendarTitle = formatWeekRange(rangeStart, rangeEnd);
	}

	async function loadCalendar() {
		isLoading = true;
		try {
			const events = await fetchEvents();
			calendarEvents = events.map(mapEvent);

			if (calendarInstance) {
				calendarInstance.clear();
				calendarInstance.createEvents(calendarEvents);

				// Re-setup hover listeners after events are loaded
				setTimeout(() => {
					const eventElements = calendarContainer?.querySelectorAll('.toastui-calendar-event');
					eventElements?.forEach((eventEl) => {
						const htmlEventEl = eventEl as HTMLElement;
						const titleEl = htmlEventEl.querySelector('.toastui-calendar-event-title');
						if (titleEl) {
							const title = titleEl.textContent?.trim();
							const matchingEvent = calendarEvents.find((ev) => ev.title === title);

							if (matchingEvent) {
								htmlEventEl.onmouseenter = () => showTooltip(matchingEvent, htmlEventEl);
								htmlEventEl.onmouseleave = () => hideTooltip();
							}
						}
					});
				}, 300);
			}
		} catch (error) {
			console.error('Failed to load events for the calendar', error);
		} finally {
			isLoading = false;
			updateCalendarTitle();
		}
	}

	function handleToday() {
		calendarInstance?.today();
		updateCalendarTitle();
		setTimeout(() => reattachHoverListeners(), 100);
	}

	function handlePrev() {
		calendarInstance?.prev();
		updateCalendarTitle();
		setTimeout(() => reattachHoverListeners(), 100);
	}

	function handleNext() {
		calendarInstance?.next();
		updateCalendarTitle();
		setTimeout(() => reattachHoverListeners(), 100);
	}

	function changeView(view: 'month' | 'week') {
		if (!calendarInstance || currentView === view) {
			return;
		}

		calendarInstance.changeView(view);
		currentView = view;
		updateCalendarTitle();
		setTimeout(() => reattachHoverListeners(), 100);
	}

	function reattachHoverListeners() {
		if (!calendarContainer || calendarEvents.length === 0) return;

		const eventElements = calendarContainer.querySelectorAll('.toastui-calendar-event');
		console.log(`Attaching hover listeners to ${eventElements.length} event elements`);

		eventElements.forEach((eventEl) => {
			const htmlEventEl = eventEl as HTMLElement;
			const titleEl = htmlEventEl.querySelector('.toastui-calendar-event-title');
			if (titleEl) {
				const title = titleEl.textContent?.trim();
				const matchingEvent = calendarEvents.find((ev) => ev.title === title);

				if (matchingEvent) {
					console.log(`Attached hover to: ${title}`);
					htmlEventEl.onmouseenter = () => {
						console.log(`Mouse enter: ${title}`);
						showTooltip(matchingEvent, htmlEventEl);
					};
					htmlEventEl.onmouseleave = () => {
						console.log(`Mouse leave: ${title}`);
						hideTooltip();
					};
				}
			}
		});
	}

	function showTooltip(event: any, eventEl: HTMLElement) {
		const { title, raw } = event;
		if (!raw || !tooltip) return;

		const winner = raw.winner || 'Not available';
		const points = raw.result?.[raw.winner?.toLowerCase()] || 0;

		const tooltipContent = `
			<div class="tooltip-title">${title}</div>
			<div class="tooltip-time">${formatDateTime(event.start.d)} - ${formatDateTime(event.end.d)}</div>
			${raw.description ? `<div class="tooltip-desc">${raw.description}</div>` : ''}
			${raw.tier ? `<div class="tooltip-tier">Tier: ${numberToRoman(raw.tier)}</div>` : ''}
			${raw.result ? `<div class="tooltip-result-${winner.toLowerCase()}">Winner: ${winner} with ${points} points</div>` : ''}
		`;

		const rect = eventEl.getBoundingClientRect();
		const scrollTop = window.scrollY || document.documentElement.scrollTop;
		const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

		tooltip.innerHTML = tooltipContent;
		tooltip.style.visibility = 'hidden';
		tooltipVisible = true;

		setTimeout(() => {
			if (!tooltip) return;
			let left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + scrollLeft;
			let top = rect.top - tooltip.offsetHeight - 10 + scrollTop;

			// Keep tooltip on screen
			if (left < 10) left = 10;
			if (left + tooltip.offsetWidth > window.innerWidth - 10) {
				left = window.innerWidth - tooltip.offsetWidth - 10;
			}
			if (top < 10) {
				top = rect.bottom + 10 + scrollTop;
			}

			tooltip.style.left = `${left}px`;
			tooltip.style.top = `${top}px`;
			tooltip.style.visibility = 'visible';
		}, 0);
	}

	function hideTooltip() {
		tooltipVisible = false;
	}

	function formatDateTime(date: Date): string {
		return date.toLocaleString('en-US', {
			month: 'short',
			day: 'numeric'
		});
	}

	onMount(() => {
		if (!calendarContainer || !browser) {
			return;
		}

		// Dynamically import Toast UI Calendar to avoid SSR issues
		let mounted = true;
		let observer: MutationObserver | null = null;

		Promise.all([
			import('@toast-ui/calendar'),
			import('@toast-ui/calendar/dist/toastui-calendar.min.css')
		]).then(([{ default: Calendar }]) => {
			if (!mounted || !calendarContainer) return;

			calendarInstance = new Calendar(calendarContainer, baseOptions);

			// Click to navigate
			calendarInstance.on('clickEvent', (eventInfo: { event: { raw?: { url?: string } } }) => {
				const url = eventInfo.event.raw?.url;
				if (url) {
					goto(url);
				}
			});

			// Hover to show tooltip - prevent default updates
			calendarInstance.on('beforeUpdateEvent', () => false);

			loadCalendar();
			updateCalendarTitle();

			// Observer to re-attach listeners when calendar re-renders
			observer = new MutationObserver(() => {
				reattachHoverListeners();
			});

			observer.observe(calendarContainer, {
				childList: true,
				subtree: true
			});
		});

		return () => {
			mounted = false;
			observer?.disconnect();
			calendarInstance?.destroy();
			calendarInstance = null;
		};
	});
</script>

<div class="calendar-container">
	<div class="calendar-toolbar">
		<div class="toolbar-group">
			<button type="button" class="toolbar-button" onclick={handlePrev}>Prev</button>
			<button type="button" class="toolbar-button" onclick={handleToday}>Today</button>
			<button type="button" class="toolbar-button" onclick={handleNext}>Next</button>
		</div>

		<h2 class="toolbar-title">{calendarTitle}</h2>

		<div class="toolbar-group">
			<button
				type="button"
				class="toolbar-button"
				class:active={currentView === 'month'}
				onclick={() => changeView('month')}
			>
				Month
			</button>
			<button
				type="button"
				class="toolbar-button"
				class:active={currentView === 'week'}
				onclick={() => changeView('week')}
			>
				Week
			</button>
		</div>
	</div>

	<div class="calendar-body">
		<div class="toastui-calendar-wrapper" bind:this={calendarContainer}></div>

		{#if isLoading}
			<div class="calendar-loading">
				<p>Loading calendar...</p>
			</div>
		{/if}
	</div>
</div>

<!-- Custom tooltip for hover -->
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
		width: 100%;
		margin: 0 auto;
		padding: 1rem;
	}

	.calendar-toolbar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.toolbar-group {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
	}

	.toolbar-title {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--color-theme-1);
	}

	.toolbar-button {
		padding: 0.5rem 0.9rem;
		border-radius: 0.5rem;
		border: 1px solid var(--color-event-upcoming-bg);
		background-color: white;
		color: var(--color-event-upcoming-fg-1);
		font-weight: 500;
		cursor: pointer;
		transition:
			background-color 0.2s ease,
			color 0.2s ease,
			border-color 0.2s ease;
	}

	.toolbar-button:hover {
		background-color: var(--color-theme-2);
		color: var(--color-theme-1);
		border-color: var(--color-theme-2);
	}

	.toolbar-button.active {
		background-color: var(--color-theme-1);
		border-color: var(--color-theme-1);
	}

	.calendar-body {
		position: relative;
		background-color: white;
		border-radius: 12px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		padding: 1rem;
		min-height: 600px;
		overflow: hidden;
	}

	.toastui-calendar-wrapper {
		width: 100%;
		height: 600px;
	}

	.calendar-loading {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.75);
		border-radius: 12px;
		font-weight: 600;
		pointer-events: none;
	}

	:global(.toastui-calendar-month-event) {
		border-radius: 0.5rem;
		border: none;
		padding: 2px 4px;
	}

	:global(.toastui-calendar-weekday-event) {
		border-radius: 0.5rem;
		border: none;
	}

	:global(.toastui-calendar-event-time),
	:global(.toastui-calendar-event-title) {
		color: inherit;
		font-weight: 600;
	}

	:global(.toastui-calendar-daygrid-cell) {
		border-color: #f0f0f0;
	}

	:global(.toastui-calendar-month-dayname) {
		background-color: #fafafa;
		border-bottom: 1px solid #e5e5e5;
		font-weight: 600;
		color: #374151;
	}

	:global(.toastui-calendar-day-name__date) {
		font-weight: 600;
	}

	:global(.toastui-calendar-popup-container) {
		border-radius: 0.75rem;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
	}

	:global(.toastui-calendar-popup-detail) {
		border-radius: 0.75rem;
	}

	:global(.toastui-calendar-popup-section) {
		padding: 0.5rem;
	}

	:global(.toastui-calendar-section-header) {
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	:global(.calendar-popup-tier),
	:global(.calendar-popup-winner) {
		font-size: 0.9rem;
		margin-bottom: 0.35rem;
	}

	:global(.calendar-popup-desc) {
		font-size: 0.9rem;
		margin-bottom: 0.35rem;
	}

	/* Custom hover tooltip */
	.event-tooltip {
		position: fixed;
		display: none;
		background-color: white;
		border-radius: 8px;
		padding: 12px 16px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		z-index: 10000;
		max-width: 320px;
		border: 1px solid #e5e5e5;
		pointer-events: none;
	}

	.event-tooltip.visible {
		display: block;
	}

	:global(.tooltip-title) {
		font-weight: 600;
		font-size: 1rem;
		margin-bottom: 0.5rem;
		color: #1f2937;
	}

	:global(.tooltip-time) {
		font-size: 0.875rem;
		color: #6b7280;
		margin-bottom: 0.5rem;
	}

	:global(.tooltip-desc) {
		font-size: 0.875rem;
		color: #4b5563;
		margin-bottom: 0.5rem;
		line-height: 1.4;
	}

	:global(.tooltip-tier) {
		font-size: 0.875rem;
		color: #4b5563;
		font-weight: 500;
		margin-bottom: 0.5rem;
	}

	:global(.tooltip-result-albemarle) {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-event-albemarle-fg);
		padding: 0.25rem 0.5rem;
		background-color: var(--color-event-albemarle-bg);
		border-radius: 4px;
		display: inline-block;
	}

	:global(.tooltip-result-lambert) {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-event-lambert-fg);
		padding: 0.25rem 0.5rem;
		background-color: var(--color-event-lambert-bg);
		border-radius: 4px;
		display: inline-block;
	}

	:global(.tooltip-result-ettl) {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-event-ettl-fg);
		padding: 0.25rem 0.5rem;
		background-color: var(--color-event-ettl-bg);
		border-radius: 4px;
		display: inline-block;
	}

	:global(.tooltip-result-hobler) {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-event-hobler-fg);
		padding: 0.25rem 0.5rem;
		background-color: var(--color-event-hobler-bg);
		border-radius: 4px;
		display: inline-block;
	}

	:global(.tooltip-result-not) {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-event-upcoming-fg-1);
		padding: 0.25rem 0.5rem;
		background-color: var(--color-event-upcoming-bg);
		border-radius: 4px;
		display: inline-block;
	}

	@media (max-width: 768px) {
		.toolbar-title {
			width: 100%;
			text-align: center;
		}

		.calendar-body {
			padding: 0.5rem;
		}

		.event-tooltip {
			max-width: 280px;
		}
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
