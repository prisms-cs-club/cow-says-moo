import { error } from '@sveltejs/kit';
import type { HouseEvent } from '$lib/format.d.ts';
import { fetchEventById } from '$lib/firebase';

export type DataType = {
    event: HouseEvent;
};

export async function load({ params }: { params: { id: string } }): Promise<DataType> {
    const cur = await fetchEventById(params.id);
    if (cur === undefined) {
        throw error(404, 'Event not found');
    }
    return {
        event: cur,
    };
}