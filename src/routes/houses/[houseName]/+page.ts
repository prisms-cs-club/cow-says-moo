// +page.ts
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

const allowedHouses = ['ettl', 'hobler', 'albemarle', 'lambert'];

export const load: PageLoad = async ({ params, fetch }) => {
    const { houseName } = params;

    if (!allowedHouses.includes(houseName.toLowerCase())) {
        throw error(404, 'House not found');
    }

    const response = await fetch(`/api/houses/${houseName}`);

    if (!response.ok) {
        throw error(response.status, 'Failed to load house data');
    }

    const houseData = await response.json();

    return {
        props: {
            house: houseData
        }
    };
};