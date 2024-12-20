import type { Event } from "$lib/format.js";
import type { RequestEvent } from '@sveltejs/kit';

/** @type {Event} */
let events: Event[] = [];

export async function GET({ url } : RequestEvent) {
    const id = url.searchParams.get('id');

    events = events.sort((a, b) => a.title.localeCompare(b.title));

    if (id) {
        const event = events.find(event => event.title === id);
        return new Response(JSON.stringify(event), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } else {
        return new Response(JSON.stringify(events), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

export async function POST({ request } : RequestEvent) {
    const newEvent = await request.json();
    if (events.find(event => event.title === newEvent.title)) {
        return new Response(JSON.stringify({ message: 'Event already exists, use update instead' }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    events.push(newEvent);
    return new Response(JSON.stringify({ message: 'Event created', event: newEvent }), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function PUT({ request } : RequestEvent) {
    const updatedEvent = await request.json();
    events = events.map(event => event.title === updatedEvent.title ? updatedEvent : event);
    return new Response(JSON.stringify({ message: 'Event updated', event: updatedEvent }), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function DELETE({ url } : RequestEvent) {
    const title = url.searchParams.get('id');
    events = events.filter(event => event.title !== title);
    return new Response(JSON.stringify({ message: `Event ${title} deleted` }), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}