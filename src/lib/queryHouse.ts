import type { House } from '$lib/format.d.ts';

export async function queryHouse(id: string): Promise<House> {
    id = id.toLowerCase();
    const response = await fetch(`/api/house?id=${id}`, {
        method: 'GET'
    });

    if (!response.ok) {
        throw new Error('Failed to fetch house');
    }
    const house: House = await response.json();
    return house;
}