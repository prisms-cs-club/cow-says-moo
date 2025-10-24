import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, url }) => {
	const session = await locals.auth();
	
	// TODO: Re-enable Firebase checks after implementing proper server-side Firebase
	// For now, skip Firebase calls to prevent Worker timeouts on Cloudflare
	const adminStatus = false;

	// Temporarily disable onboarding redirect to prevent Worker hangs
	// if (session?.user?.email && url.pathname !== '/onboarding' && url.pathname !== '/auth/signout') {
	// 	const needs = await needsOnboarding(session.user.email);
	// 	if (needs) {
	// 		throw redirect(303, '/onboarding');
	// 	}
	// }

	return {
		session,
		isAdmin: adminStatus
	};
};
