// +page.ts for [house]

import { error, redirect } from '@sveltejs/kit';

export type DataType = {
    house: string;
};

export function load({ params }: { params: { house: string } }): DataType {
    if (['Albemarle', 'Hobler', 'Lambert', 'Ettl'].includes(params.house)) {
        redirect(307, `/houses/${params.house.toLowerCase()}`);
    } else if(['albemarle', 'hobler', 'lambert', 'ettl'].includes(params.house)) {
        return {
            house: params.house.charAt(0).toUpperCase() + params.house.slice(1)
        };
    }
    error(404, {
        message: `House with id '${params.house}' not found`
    });
}