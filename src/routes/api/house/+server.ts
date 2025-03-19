import type { House } from '$lib/format.d.ts';
import type { RequestEvent } from '@sveltejs/kit';

// handle request of information of a house (Albemarle, Ettl, Hobler, Lambert)

const house: House[] = [{ name: "Ettl", description: "asdf", points: 690 }, { name: "Hobler", description: "haha", points: 800 }, { name: "Lambert", description: "hehe", points: 580 }, { name: "Albemarle", description: "hihi", points: 650 }];
const nothing = [{ name: "null", description: "null" }];

export async function GET({ url }: RequestEvent) {
    const id = url.searchParams.get('id');
    if (id === null) {
        return new Response(JSON.stringify(nothing), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    return new Response(JSON.stringify(house.find(h => h.name === id)), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}