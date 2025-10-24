import type { Member } from '$lib/format';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Firebase config for server-side - uses public API key (this is safe)
const firebaseConfig = {
	apiKey: 'AIzaSyBqTxONPg9_8pF-8LBKxYBHrw6IKp9wfhY', // Public API key - safe to hardcode
	authDomain: 'cow-says-moo.firebaseapp.com',
	databaseURL: 'https://cow-says-moo-default-rtdb.firebaseio.com',
	projectId: 'cow-says-moo',
	storageBucket: 'cow-says-moo.firebasestorage.app',
	messagingSenderId: '527925815394',
	appId: '1:527925815394:web:1c8f4c0f8e7c4d5a8b9c6d'
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
 */
export async function createOrUpdateMember(
	email: string,
	data: {
		name?: string;
		house?: string;
		role?: 'student' | 'teacher' | 'admin';
	}
): Promise<void> {
	try {
		const existingMember = await getMemberByEmail(email);

		const memberData = {
			email,
			name: data.name ?? existingMember?.name ?? '',
			house: data.house ?? existingMember?.house ?? '',
			role: data.role ?? existingMember?.role ?? 'student',
			eventsWon: existingMember?.eventsWon ?? []
		};

		const memberRef = doc(db, 'members', email);
		await setDoc(memberRef, memberData, { merge: true });

		console.log('Member created/updated:', email);
	} catch (error) {
		console.error('Error creating/updating member:', error);
		throw error;
	}
}
