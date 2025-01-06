import type { Event } from '$lib/format.d.ts';

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

// Example function to update local event cache
function updateLocalEventCache(updatedEvent: Event) {
    // Implementation to update the local state or cache with the updated event
    // This is just a placeholder and should be replaced with actual logic
    console.log('Event updated locally:', updatedEvent);
}

export async function deleteEvent(deleteEventId: String) {
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