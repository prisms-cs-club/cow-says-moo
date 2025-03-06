import type { Timestamp } from "firebase/firestore";

/**
 * Type definition of the news.
 */
export type News = {
	title: string;
	date: string;
	author: string;
	content: string;
};

/**
 * Type definition of the event.
 */
export type HouseEvent = {
	/**
	 * Title of the event
	 */
	title: string;

	/**
	 * Starting date of the event
	 */
	dateStart: Timestamp;

	/**
	 * Ending date of the event
	 *
	 * If the event is a one-day event, the dateEnd field will be the same as the dateStart field.
	 */
	dateEnd: Timestamp;

	/**
	 * a detailed description of the event, in Markdown format
	 */
	description: string;

	/**
	 * the tier of the event (either I, II, III, or IV)
	 */
	tier: number;

	/**
	 * If the event is concluded, the result field will be filled with the result of the event.
	 * Otherwise, the result field will be null.
	 */
	result?: {
		albemarle: number;
		hobler: number;
		lambert: number;
		ettl: number;
	};

	/**
	 * If the event is concluded, the winner field will be filled with the name of the winner.
	 */
	winner?: string;
};

export type House = {
	name: string;
	description: string;
	points: number;
};

export type Member = {
	email: string;
	name: string;
	house: string;
	eventsWon?: string[]; // as the name indicates, an array of events won by the person
	role: "student" | "teacher" | "admin";
} | undefined;