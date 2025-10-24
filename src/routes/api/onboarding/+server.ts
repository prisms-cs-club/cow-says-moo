import { json } from '@sveltejs/kit';
import { createOrUpdateMember } from '$lib/firebase.server';

export async function POST({ request, locals }) {
	try {
		const session = await locals.auth();

		if (!session?.user?.email) {
			return json({ error: 'Not authenticated' }, { status: 401 });
		}

		const { name, house } = await request.json();

		if (!name || !house) {
			return json({ error: 'Name and house are required' }, { status: 400 });
		}

		// Validate house
		const validHouses = ['albemarle', 'ettl', 'hobler', 'lambert'];
		if (!validHouses.includes(house.toLowerCase())) {
			return json({ error: 'Invalid house' }, { status: 400 });
		}

		// Create or update the member using REST API
		await createOrUpdateMember(session.user.email, {
			name,
			house: house.toLowerCase(),
			role: 'student'
		});

		return json({ success: true });
	} catch (error) {
		console.error('Onboarding error:', error);
		return json({ error: 'Failed to complete onboarding' }, { status: 500 });
	}
}
