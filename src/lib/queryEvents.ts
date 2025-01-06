import type { Event, Member } from '$lib/format';
import { getMember } from '$lib/queryMember';
import { page } from '$app/state';
import { error } from 'console';

async function ifAdmin() { let a = await getMember(); return (a !== undefined && a.role === "admin"); }

export async function queryEvents(id: string): Promise<Event[]> {
    const response = await fetch(`/api/event?id=${id}`, {
        method: 'GET'
    });

    if (!response.ok) {
        throw new Error('Failed to fetch events');
    }
    return await response.json();
}

export async function fetchEvents() {
    try {
        const response = await fetch('/api/event', {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function fetchEventById(id: string) {
    try {
        const response = await fetch(`/api/event?id=${id}`, {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error('Failed to fetch event');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function createEvent(newEvent: Event) {
    if (!await ifAdmin()) {
        console.error("Unfortunately, You are not an admin");
        throw new Error("Unfortunately, you are not an admin.");
    }

    try {
        const response = await fetch('/api/event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEvent)
        });
        if (!response.ok) {
            throw new Error('Failed to create event');
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function updateEvent(updateEvent: Event) {
    if (!await ifAdmin()) {
        console.error("Unfortunately, You are not an admin");
        throw new Error("Unfortunately, You are not an admin");
    }

    try {
        const response = await fetch('/api/event', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateEvent)
        });
        if (!response.ok) {
            throw new Error('Failed to update event');
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function deleteEvent(deleteEventId: String) {
    if (!await ifAdmin()) {
        console.error("Unfortunately, You are not an admin");
        throw new Error("Unfortunately, you are not an admin.");
    }

    try {
        const response = await fetch(`/api/event?id=${deleteEventId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete event');
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}