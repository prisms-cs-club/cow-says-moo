import type { Member } from '$lib/format';

// Firestore REST API configuration for Cloudflare Workers
const PROJECT_ID = 'cow-says-moo';
const FIRESTORE_BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

/**
 * Convert Firestore REST API document format to plain object
 */
function parseFirestoreDocument(doc: any): any {
	if (!doc || !doc.fields) return null;

	const result: any = {};
	for (const [key, value] of Object.entries(doc.fields)) {
		const fieldValue = value as any;
		if (fieldValue.stringValue !== undefined) {
			result[key] = fieldValue.stringValue;
		} else if (fieldValue.integerValue !== undefined) {
			result[key] = parseInt(fieldValue.integerValue);
		} else if (fieldValue.arrayValue?.values) {
			result[key] = fieldValue.arrayValue.values.map(
				(v: any) => v.stringValue ?? v.integerValue ?? null
			);
		} else if (fieldValue.arrayValue) {
			result[key] = [];
		}
	}
	return result;
}

/**
 * Convert plain object to Firestore REST API document format
 */
function toFirestoreDocument(data: any): any {
	const fields: any = {};
	for (const [key, value] of Object.entries(data)) {
		if (typeof value === 'string') {
			fields[key] = { stringValue: value };
		} else if (typeof value === 'number') {
			fields[key] = { integerValue: value };
		} else if (Array.isArray(value)) {
			fields[key] = {
				arrayValue: {
					values: value.map((v) => ({ stringValue: String(v) }))
				}
			};
		}
	}
	return { fields };
}

/**
 * Fetch a member by their email address (server-side using REST API)
 */
export async function getMemberByEmail(email: string): Promise<Member | undefined> {
	try {
		const url = `${FIRESTORE_BASE_URL}/members/${encodeURIComponent(email)}`;
		const response = await fetch(url);

		if (response.status === 404) {
			return undefined;
		}

		if (!response.ok) {
			console.error('[Firebase Server] Error fetching member:', response.status);
			return undefined;
		}

		const data = await response.json();
		return parseFirestoreDocument(data) as Member;
	} catch (error) {
		console.error('[Firebase Server] Error fetching member by email:', error);
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
 * Create or update a member in the database (server-side using REST API)
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

		const url = `${FIRESTORE_BASE_URL}/members/${encodeURIComponent(email)}`;
		const response = await fetch(url, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(toFirestoreDocument(memberData))
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error('[Firebase Server] Error updating member:', response.status, errorText);
			throw new Error(`Failed to update member: ${response.status}`);
		}

		console.log('[Firebase Server] Member created/updated:', email);
	} catch (error) {
		console.error('[Firebase Server] Error creating/updating member:', error);
		throw error;
	}
}
