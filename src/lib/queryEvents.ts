import type { Event } from '$lib/format.d.ts';

export async function queryEvents(id: string): Promise<Event[]> {
    const response = await fetch(`/api/event?id=${id}`, {
        method: 'GET'
    });

    if (!response.ok) {
        throw new Error('Failed to fetch events');
    }
    const events: Event[] = await response.json();
    return events;
}