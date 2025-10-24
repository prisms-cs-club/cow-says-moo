import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const session = await locals.auth();

	// If not logged in, redirect to sign in
	if (!session?.user?.email) {
		throw redirect(303, '/auth/signin');
	}

	// TODO: Re-enable onboarding check after implementing proper server-side Firebase
	// Temporarily skip check to prevent Worker timeouts
	const needs = false; // TEMPORARY - was: await needsOnboarding(session.user.email);
	const member = undefined; // TEMPORARY - was: await getMemberByEmail(session.user.email);

	// If they don't need onboarding, redirect to home
	if (!needs) {
		throw redirect(303, '/');
	}

	return {
		session,
		member,
		email: session.user.email,
		defaultName: session.user.name || ''
	};
};
