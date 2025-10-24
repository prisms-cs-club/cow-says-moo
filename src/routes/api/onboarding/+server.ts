import { json } from '@sveltejs/kit';

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

		// TODO: Re-enable member creation after implementing proper server-side Firebase
		// Temporarily disabled to prevent Worker timeouts
		// await createOrUpdateMember(session.user.email, {
		// 	name,
		// 	house: house.toLowerCase(),
		// 	role: 'student'
		// });

		console.log('[Onboarding] Would create member:', session.user.email, name, house);

		return json({ success: true });
	} catch (error) {
		console.error('Onboarding error:', error);
		return json({ error: 'Failed to complete onboarding' }, { status: 500 });
	}
}
