import type { Member } from '$lib/format';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Firebase config for server-side - uses public API key (this is safe)
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
	authDomain: 'cow-says-moo.firebaseapp.com',
	databaseURL: 'https://cow-says-moo-default-rtdb.firebaseio.com',
	projectId: 'cow-says-moo',
	storageBucket: 'cow-says-moo.firebasestorage.app',
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
	appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
};

// Initialize Firebase for server-side use
const firebaseApp = initializeApp(firebaseConfig, 'server-app');
const db = getFirestore(firebaseApp);

/**
 * Fetch a member by their email address (server-side)
 */
export async function getMemberByEmail(email: string): Promise<Member | undefined> {
	try {
		const docRef = doc(db, 'members', email);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			return docSnap.data() as Member;
		}
		return undefined;
	} catch (error) {
		console.error('Error fetching member by email:', error);
		return undefined;
	}
}

/**
 * Check if a user is an admin (server-side)
 */
export async function isAdmin(email: string | null | undefined): Promise<boolean> {
	if (!email) return false;
	const member = await getMemberByEmail(email);
	return member?.role === 'admin';
}

/**
 * Check if a member needs to complete onboarding (server-side)
 */
export async function needsOnboarding(email: string): Promise<boolean> {
	const member = await getMemberByEmail(email);
	if (!member) return true;
	return !member.name || !member.house;
}

/**
 * Create or update a member in the database (server-side)
 * NOTE: Currently not working in Cloudflare Workers - Firebase client SDK not compatible
 */
export async function createOrUpdateMember(
	email: string,
	data: {
		name?: string;
		house?: string;
		role?: 'student' | 'teacher' | 'admin';
	}
): Promise<void> {
	console.warn('[Firebase Server] createOrUpdateMember not implemented for Cloudflare Workers');
	// TODO: Implement using Firestore REST API
	return Promise.resolve();
}
