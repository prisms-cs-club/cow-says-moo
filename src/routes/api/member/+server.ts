import type { Event } from "$lib/format.js";
import type { RequestEvent } from '@sveltejs/kit';

// handle request of information of a member. Get information of member's house and events enrolled in
// API format: `GET /api/member?email=name@prismsus.org` or `GET /api/member?name=name`

export async function GET({ url }: RequestEvent) {
    const email = url.searchParams.get('email');
    // TODO: implement search by name
}