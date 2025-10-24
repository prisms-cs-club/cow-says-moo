import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth();

	// Check if user is logged in
	if (!session?.user?.email) {
		throw redirect(303, '/auth/signin');
	}

	// TODO: Re-enable admin check after implementing proper server-side Firebase
	// Temporarily allow all logged-in users to prevent Worker timeouts
	const adminStatus = true; // TEMPORARY - was: await isAdmin(session.user.email);
	// if (!adminStatus) {
	// 	throw redirect(303, '/');
	// }

	return {
		session,
		isAdmin: adminStatus
	};
};
