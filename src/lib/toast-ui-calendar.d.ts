declare module '@toast-ui/calendar' {
	export interface EventObject {
		id: string;
		calendarId: string;
		title: string;
		start: Date | string;
		end: Date | string;
		category?: 'allday' | 'time' | 'task';
		isAllday?: boolean;
		isReadOnly?: boolean;
		backgroundColor?: string;
		borderColor?: string;
		color?: string;
		customStyle?: string;
		raw?: any;
		state?: string;
	}

	export interface CalendarInfo {
		id: string;
		name: string;
		backgroundColor?: string;
		borderColor?: string;
		color?: string;
		dragBackgroundColor?: string;
	}

	export interface TemplateEvent {
		id: string;
		title: string;
		isAllday: boolean;
		start: { d: Date };
		end: { d: Date };
		category: string;
		backgroundColor: string;
		borderColor: string;
		color: string;
		raw?: any;
	}

	export interface MonthOptions {
		startDayOfWeek?: number;
		dayNames?: string[];
		visibleWeeksCount?: number;
		isAlways6Weeks?: boolean;
		narrowWeekend?: boolean;
	}

	export interface WeekOptions {
		startDayOfWeek?: number;
		dayNames?: string[];
		showTimezoneCollapseButton?: boolean;
		timezonesCollapsed?: boolean;
		hourStart?: number;
		hourEnd?: number;
		eventView?: boolean | string[];
		taskView?: boolean | string[];
		collapseDuplicateEvents?: {
			getDuplicateEvents?: (targetEvent: EventObject, events: EventObject[]) => EventObject[];
			getMainEvent?: (events: EventObject[]) => EventObject;
		};
	}

	export interface Template {
		milestone?: (event: TemplateEvent) => string;
		milestoneTitle?: () => string;
		task?: (event: TemplateEvent) => string;
		taskTitle?: () => string;
		allday?: (event: TemplateEvent) => string;
		alldayTitle?: () => string;
		time?: (event: TemplateEvent) => string;
		goingDuration?: (event: TemplateEvent) => string;
		comingDuration?: (event: TemplateEvent) => string;
		monthMoreTitleDate?: (date: string, dayEvents: EventObject[]) => string;
		monthMoreClose?: () => string;
		monthGridHeader?: (model: { date: string; day: number }) => string;
		monthGridHeaderExceed?: (hiddenEvents: number) => string;
		monthGridFooter?: (model: { date: string }) => string;
		monthGridFooterExceed?: (hiddenEvents: number) => string;
		monthDayName?: (model: { day: number; label: string }) => string;
		weekDayName?: (model: { day: number; label: string; date?: string }) => string;
		weekGridFooterExceed?: (hiddenEvents: number) => string;
		collapseBtnTitle?: () => string;
		timezoneDisplayLabel?: (timezoneOffset: number, displayLabel: string) => string;
		timegridDisplayPrimaryTime?: (time: { hour: number; minutes: number }) => string;
		timegridDisplayTime?: (time: { hour: number; minutes: number }) => string;
		timegridNowIndicatorLabel?: (
			timezone: string,
			time: { hour: number; minutes: number }
		) => string;
		popupIsAllday?: () => string;
		popupStateFree?: () => string;
		popupStateBusy?: () => string;
		titlePlaceholder?: () => string;
		locationPlaceholder?: () => string;
		startDatePlaceholder?: () => string;
		endDatePlaceholder?: () => string;
		popupSave?: () => string;
		popupUpdate?: () => string;
		popupDetailTitle?: (event: TemplateEvent) => string;
		popupDetailDate?: (isAllday: boolean, start: Date, end: Date) => string;
		popupDetailLocation?: (location: string) => string;
		popupDetailUser?: (user: string) => string;
		popupDetailState?: (state: string) => string;
		popupDetailRepeat?: (repeat: string) => string;
		popupDetailBody?: (event: TemplateEvent) => string;
		popupEdit?: () => string;
		popupDelete?: () => string;
	}

	export interface GridSelectionOptions {
		enableDblClick?: boolean;
		enableClick?: boolean;
	}

	export interface Options {
		defaultView?: 'month' | 'week' | 'day';
		taskView?: boolean | string[];
		scheduleView?: boolean | string[];
		theme?: Record<string, any>;
		template?: Template;
		week?: WeekOptions;
		month?: MonthOptions;
		calendars?: CalendarInfo[];
		useFormPopup?: boolean;
		useDetailPopup?: boolean;
		isReadOnly?: boolean;
		usageStatistics?: boolean;
		eventFilter?: (event: EventObject) => boolean;
		timezone?: {
			zones?: Array<{
				timezoneName: string;
				displayLabel?: string;
				tooltip?: string;
			}>;
		};
		gridSelection?: boolean | GridSelectionOptions;
	}

	export interface EventInfo {
		event: EventObject;
		nativeEvent?: MouseEvent;
	}

	export interface DateRangeType {
		start: { d: Date };
		end: { d: Date };
	}

	export default class Calendar {
		constructor(container: HTMLElement, options?: Options);

		// Event methods
		createEvents(events: EventObject[]): void;
		updateEvent(eventId: string, calendarId: string, changes: Partial<EventObject>): void;
		deleteEvent(eventId: string, calendarId: string): void;
		getEvent(eventId: string, calendarId: string): EventObject | null;
		clear(): void;

		// View methods
		render(): void;
		destroy(): void;
		changeView(viewName: 'month' | 'week' | 'day'): void;
		getViewName(): string;
		setOptions(options: Partial<Options>): void;

		// Navigation methods
		today(): void;
		prev(): void;
		next(): void;
		setDate(date: Date | string): void;
		getDate(): { d: Date; toDate(): Date };
		getDateRangeStart(): { d: Date; toDate(): Date };
		getDateRangeEnd(): { d: Date; toDate(): Date };

		// Event handlers
		on(eventName: string, handler: (eventInfo: any) => void): void;
		off(eventName: string, handler?: (eventInfo: any) => void): void;
		fire(eventName: string, eventData?: any): void;

		// Calendar methods
		setCalendarColor(calendarId: string, option: Partial<CalendarInfo>): void;
		setCalendars(calendars: CalendarInfo[]): void;
	}
}

declare module '@toast-ui/calendar/dist/toastui-calendar.min.css' {
	const content: any;
	export default content;
}
