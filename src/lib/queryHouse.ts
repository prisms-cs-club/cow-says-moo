import type { House } from '$lib/format';

export async function queryHouse(id: string): Promise<House> {
    const response = await fetch(`/api/house?id=${id}`, {
        method: 'GET'
    });

    if (!response.ok) {
        throw new Error('Failed to fetch house');
    }
    const house: House = await response.json();
    return house;
}