// src/routes/api/events/+server.js
import type { Event } from "$lib/format.js";

// var events = [{ name: 'Event 1', date: '2024-11-18' }, { name: 'Event 2', date: '2024-11-18' }, { name: 'Event 3', date: '2024-11-18' }];
/** @type {Event} */
let events: Event[] = [];

export async function GET({ url }) {
    const id = url.searchParams.get('id');

    events = events.sort((a, b) => a.title.localeCompare(b.title));

    if (id) {
        const event = { id, title: `Event ${id}`, date: '2024-11-18' };
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

export async function POST({ request }) {
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

export async function PUT({ request }) {
    const updatedEvent = await request.json();
    events = events.map(event => event.title === updatedEvent.title ? updatedEvent : event);
    return new Response(JSON.stringify({ message: 'Event updated', event: updatedEvent }), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function DELETE({ url }) {
    const title = url.searchParams.get('id');
    console.log(title);
    events = events.filter(event => event.title !== title);
    console.log(events);
    return new Response(JSON.stringify({ message: `Event ${title} deleted` }), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}