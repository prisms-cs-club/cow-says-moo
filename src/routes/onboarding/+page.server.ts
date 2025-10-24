import { redirect } from '@sveltejs/kit';
import { getMemberByEmail, needsOnboarding } from '$lib/firebase.server';

export const load = async ({ locals }) => {
	const session = await locals.auth();

	// If not logged in, redirect to sign in
	if (!session?.user?.email) {
		throw redirect(303, '/auth/signin');
	}

	// Check if user needs onboarding
	const needs = await needsOnboarding(session.user.email);

	// If they don't need onboarding, redirect to home
	if (!needs) {
		throw redirect(303, '/');
	}

	const member = await getMemberByEmail(session.user.email);

	return {
		session,
		member,
		email: session.user.email,
		defaultName: session.user.name || ''
	};
};
