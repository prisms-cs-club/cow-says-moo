import { redirect } from '@sveltejs/kit';
import { isAdmin } from '$lib/firebase.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth();

	// Check if user is logged in
	if (!session?.user?.email) {
		throw redirect(303, '/auth/signin');
	}

	// Check if user is admin using REST API
	const adminStatus = await isAdmin(session.user.email);
	if (!adminStatus) {
		throw redirect(303, '/');
	}

	return {
		session,
		isAdmin: adminStatus
	};
};
