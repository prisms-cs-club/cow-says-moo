import { error } from '@sveltejs/kit';
import type { HouseEvent } from '$lib/format.d.ts';

async function fetchEventById(fetch: typeof window.fetch, id: string): Promise<HouseEvent> {
    try {
        const response = await fetch(`/api/event?id=${id}`, {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error('Failed to fetch event');
        }
        const event: HouseEvent = await response.json();
        return event;
    } catch (err) {
        console.error(err);
        throw new Error('Event not found');
    }
}

export type DataType = {
    event: HouseEvent;
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