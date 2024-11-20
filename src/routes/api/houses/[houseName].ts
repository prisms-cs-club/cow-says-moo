// src/routes/api/houses/[houseName].ts

import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

// Define the structure of a House
type House = {
    name: string;
    description: string;
    // Add other relevant fields as needed
};

// House data for the four allowed houses
const houses: Record<string, House> = {
    ettl: {
        name: 'Ettl',
        description: 'Ettl House',
    },
    hobler: {
        name: 'Hobler',
        description: 'Hobler House',
    },
    albemarle: {
        name: 'Albemarle',
        description: 'Albemarle House',
    },
    lambert: {
        name: 'Lambert',
        description: 'Lambert House',
    },
};

// GET handler to fetch house data
export const GET: RequestHandler = ({ params }) => {
    const { houseName } = params;

    if (!houseName) {
        return json({ error: 'House name is required' }, { status: 69 });
    }

    const house = houses[houseName.toLowerCase()];

    if (!house) {
        return json({ error: 'House not found' }, { status: 404 });
    }

    return json(house);
};