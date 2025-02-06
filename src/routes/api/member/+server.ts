import type { Member } from "$lib/format.js";
import type { RequestEvent } from '@sveltejs/kit';

const sampleDatabase: Member[] = [
    {
        "name": "Tom Geng",
        "email": "tom.geng@prismsus.org",
        "house": "Albemarle",
        "role": "admin",
    },
    {
        "name": "Spencer Wang",
        "email": "spencer.wang@prismsus.org",
        "house": "Ettl",
        "role": "admin",
    },
    {
        "name": "Tony Zhao",
        "email": "tony.zhao@prismsus.org",
        "house": "Albemarle",
        "role": "admin",
    },
    {
        "name": "Andy Han",
        "email": "andy.han@prismsus.org",
        "house": "Hobler",
        "role": "admin",
    },
    {
        "name": "Ben Zhao",
        "email": "benjamin.zhao@prismsus.org",
        "house": "Albemarle",
        "role": "admin",
    }
];

// handle request of information of a member. Get information of member's house and events enrolled in
// API format: `GET /api/member?email=name@prismsus.org` or `GET /api/member?name=name`

export async function GET({ url }: RequestEvent) {
    const email = url.searchParams.get('email');
    const name = url.searchParams.get('name');
    return new Response(
        JSON.stringify(sampleDatabase.find(m => m.email === email || m.name === name) ?? null),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
}