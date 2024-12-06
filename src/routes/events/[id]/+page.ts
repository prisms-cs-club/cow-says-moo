import type { PrismsEvent } from '$lib/format.d.ts';
import { error } from '@sveltejs/kit';

export type DataType = {
	id: string;
	eventBody: PrismsEvent;
};

const sampleOngoingEvent: PrismsEvent = {
	title: 'Sample Ongoing Event',
	dateStart: '2024-11-18',
	dateEnd: '2024-11-18',
	description: 'This is a sample for an ongoing event',
	tier: 2,
	result: null,
	winner: null
};

const sampleCompletedEvent: PrismsEvent = {
	title: 'Sample Completed Event',
	dateStart: '2024-11-18',
	dateEnd: '2024-11-18',
	description: 'This is a sample for a completed event',
	tier: 2,
	result: {
		albemarle: 400,
		hobler: 300,
		lambert: 200,
		ettl: 100
	},
	winner: 'Ablemarle'
};

export function load({ params }: { params: { id: string } }): DataType {
	if (params.id === 'sample-ongoing') {
		return {
			id: params.id,
			eventBody: sampleOngoingEvent
		};
	} else if (params.id == 'sample-completed') {
		return {
			id: params.id,
			eventBody: sampleCompletedEvent
		};
	}
	error(404, {
		message: `Event with id '${params.id}' not found`
	});
}
