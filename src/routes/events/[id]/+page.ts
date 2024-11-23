import { error } from '@sveltejs/kit';
import type { Event } from '$lib/format.d.ts';

async function fetchEventById(fetch: typeof window.fetch, id: string): Promise<Event> {
    try {
        console.log(id);
        const response = await fetch(`/api/events?id=${id}`, {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error('Failed to fetch event');
        }
        const event: Event = await response.json();
        // console.log(event);
        return event;
    } catch (err) {
        console.error(err);
        throw new Error('Event not found');
    }
}

export type DataType = {
    event: Event;
};

export async function load({ params, fetch }: { params: { id: string }, fetch: typeof window.fetch }): Promise<DataType> {
    const cur = await fetchEventById(fetch, params.id);
    if (!cur) {
        throw error(404, 'Event not found');
    }
    return {
        event: cur,
    };
}