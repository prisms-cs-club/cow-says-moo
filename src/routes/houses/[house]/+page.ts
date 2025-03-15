// +page.ts for [house]

import { error } from '@sveltejs/kit';

export type DataType = {
    house: string;
};

export function load({ params }: { params: { house: string } }): DataType {
    if (['Albemarle', 'Hobler', 'Lambert', 'Ettl'].includes(params.house)) {
        return {
            house: params.house
        };
    }
    error(404, {
        message: `House with id '${params.house}' not found`
    });
}