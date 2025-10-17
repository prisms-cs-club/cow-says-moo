import { isAdmin, needsOnboarding } from '$lib/firebase';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, url }) => {
	const session = await locals.auth();
	const adminStatus = session?.user?.email ? await isAdmin(session.user.email) : false;

	// Check if user needs onboarding
	if (session?.user?.email && url.pathname !== '/onboarding' && url.pathname !== '/auth/signout') {
		const needs = await needsOnboarding(session.user.email);
		if (needs) {
			throw redirect(303, '/onboarding');
		}
	}

	return {
		session,
		isAdmin: adminStatus
	};
};
