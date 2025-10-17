import type { HouseEvent } from '$lib/format';
import { initializeApp } from 'firebase/app';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	limit,
	orderBy,
	query,
	QueryConstraint,
	Timestamp,
	where
} from 'firebase/firestore';

/**
 * Firebase configuration.
 */
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: 'cow-says-moo.firebaseapp.com',
	databaseURL: 'https://cow-says-moo-default-rtdb.firebaseio.com',
	projectId: 'cow-says-moo',
	storageBucket: 'cow-says-moo.firebasestorage.app',
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

interface EventsCache {
	events: HouseEvent[] | null;
	timestamp: Timestamp | null;
}

const eventsCache: EventsCache = { events: null, timestamp: null };

if (typeof window !== 'undefined') {
	try {
		const savedCache = localStorage.getItem('eventsCache');
		if (savedCache) {
			const parsed = JSON.parse(savedCache);
			// Restore Timestamp objects which were serialized
			if (parsed.timestamp) {
				parsed.timestamp = new Timestamp(parsed.timestamp.seconds, parsed.timestamp.nanoseconds);
			}
			// Restore date objects in events which were serialized
			if (parsed.events) {
				parsed.events.forEach((event: HouseEvent) => {
					event.dateStart = new Timestamp(event.dateStart.seconds, event.dateStart.nanoseconds);
					event.dateEnd = new Timestamp(event.dateEnd.seconds, event.dateEnd.nanoseconds);
				});
			}
			Object.assign(eventsCache, parsed);
			console.log('Loaded events cache from localStorage');
		}
	} catch (e) {
		console.error('Failed to load events cache from localStorage:', e);
	}
}

// async function ifAdmin() { const a = await getMember(); return (a !== undefined && a.role === "admin"); }

export async function fetchEvents(): Promise<HouseEvent[]> {
	try {
		const serverTimestamp = await fetchUpdateTime();
		const localTimestamp = eventsCache.timestamp;

		const isTimestampMatching =
			localTimestamp &&
			serverTimestamp.seconds === localTimestamp.seconds &&
			serverTimestamp.nanoseconds === localTimestamp.nanoseconds;

		if (eventsCache.events && isTimestampMatching) {
			console.log('Timestamps match - using cached events');
			return eventsCache.events;
		}

		console.log('Timestamps different or no cache - fetching fresh events');
		const q = query(collection(db, 'events'), orderBy('dateStart', 'desc'));
		const querySnapshot = await getDocs(q);
		const events = querySnapshot.docs.map((doc) => {
			const data = doc.data() as HouseEvent;
			data.id = doc.id;
			return data;
		});

		eventsCache.events = events;
		eventsCache.timestamp = serverTimestamp;

		if (typeof window !== 'undefined') {
			try {
				localStorage.setItem('eventsCache', JSON.stringify(eventsCache));
				console.log('Updated localStorage cache with new events and timestamp');
			} catch (e) {
				console.error('Failed to save events cache to localStorage:', e);
			}
		}

		return events;
	} catch (error) {
		console.error('Error fetching events:', error);
		if (eventsCache.events) {
			console.log('Returning cached events after error');
			return eventsCache.events;
		}
		throw error;
	}
}

export async function fetchEventsWonBy(house: string): Promise<HouseEvent[]> {
	const events = await fetchEvents();
	return events.filter((event) => event.winner === house);
}

export async function fetchEventsBetween(
	end: Date,
	start?: Date,
	queryLimit?: number
): Promise<HouseEvent[]> {
	const serverTimestamp = await fetchUpdateTime();
	const localTimestamp = eventsCache.timestamp;

	const isTimestampMatching =
		localTimestamp &&
		serverTimestamp.seconds === localTimestamp.seconds &&
		serverTimestamp.nanoseconds === localTimestamp.nanoseconds;

	if (eventsCache.events && isTimestampMatching) {
		console.log('Timestamps match - using cached events');
		return eventsCache.events
			.filter((event) => {
				const eventDate = event.dateStart.toDate();
				return eventDate <= end && (!start || eventDate >= start);
			})
			.slice(0, queryLimit);
	}

	const conditions: QueryConstraint[] = [];
	if (start !== undefined) {
		conditions.push(where('dateStart', '>=', start));
	}
	conditions.push(where('dateStart', '<=', end));
	if (queryLimit !== undefined) {
		conditions.push(limit(queryLimit));
	}
	const q = query(collection(db, 'events'), orderBy('dateStart', 'desc'), ...conditions);
	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map((doc) => {
		const data = doc.data() as HouseEvent;
		data.id = doc.id;
		return data;
	});
}

export async function fetchEventById(id: string): Promise<HouseEvent | undefined> {
	const docRef = await getDoc(doc(db, 'events', id));
	if (docRef.exists()) {
		const data = docRef.data() as HouseEvent;
		data.id = docRef.id;
		return data;
	}
	return undefined;
}

export async function fetchUpdateTime(): Promise<Timestamp> {
	try {
		const docRef = await getDoc(doc(db, 'summary', 'timestamp'));

		if (!docRef.exists()) {
			throw new Error('No timestamp document found');
		}

		const data = docRef.data();
		if (!data) {
			throw new Error('Empty timestamp document');
		}

		const timestampField = Object.entries(data).find(([_, value]) => value instanceof Timestamp);
		if (timestampField) {
			return timestampField[1] as Timestamp;
		} else if (data.date && data.date instanceof Timestamp) {
			return data.date;
		} else {
			throw new Error('Invalid timestamp format in document');
		}
	} catch (error) {
		console.error('Error fetching update time:', error);
		throw error;
	}
}

export async function queryScoreSummary(): Promise<{ [key: string]: number }> {
	const response = doc(db, 'summary', 'scores');
	const docRef = await getDoc(response);
	return docRef.data() as { [key: string]: number };
}

/**
 * Fetch a member by their email address
 */
export async function getMemberByEmail(email: string): Promise<import('$lib/format').Member> {
	try {
		const docRef = await getDoc(doc(db, 'members', email));
		if (docRef.exists()) {
			return docRef.data() as import('$lib/format').Member;
		}
		return undefined;
	} catch (error) {
		console.error('Error fetching member by email:', error);
		return undefined;
	}
}

/**
 * Check if a user is an admin
 */
export async function isAdmin(email: string | null | undefined): Promise<boolean> {
	if (!email) return false;
	const member = await getMemberByEmail(email);
	return member?.role === 'admin';
}

/**
 * Fetch all members from the database
 */
export async function getAllMembers(): Promise<NonNullable<import('$lib/format').Member>[]> {
	try {
		const querySnapshot = await getDocs(collection(db, 'members'));
		return querySnapshot.docs.map((doc) => {
			const data = doc.data();
			return {
				email: doc.id,
				name: data.name,
				house: data.house,
				eventsWon: data.eventsWon || [],
				role: data.role
			} as NonNullable<import('$lib/format').Member>;
		});
	} catch (error) {
		console.error('Error fetching all members:', error);
		return [];
	}
}

/**
 * Fetch members by house
 */
export async function getMembersByHouse(
	house: string
): Promise<NonNullable<import('$lib/format').Member>[]> {
	try {
		const q = query(collection(db, 'members'), where('house', '==', house));
		const querySnapshot = await getDocs(q);
		return querySnapshot.docs.map((doc) => {
			const data = doc.data();
			return {
				email: doc.id,
				name: data.name,
				house: data.house,
				eventsWon: data.eventsWon || [],
				role: data.role
			} as NonNullable<import('$lib/format').Member>;
		});
	} catch (error) {
		console.error(`Error fetching members for house ${house}:`, error);
		return [];
	}
}

/**
 * Create or update a member in the database
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
		const { setDoc } = await import('firebase/firestore');
		const memberRef = doc(db, 'members', email);
		const existingMember = await getMemberByEmail(email);

		const memberData = {
			email,
			name: data.name ?? existingMember?.name ?? '',
			house: data.house ?? existingMember?.house ?? '',
			role: data.role ?? existingMember?.role ?? 'student',
			eventsWon: existingMember?.eventsWon ?? []
		};

		await setDoc(memberRef, memberData, { merge: true });
		console.log('Member created/updated:', email);
	} catch (error) {
		console.error('Error creating/updating member:', error);
		throw error;
	}
}

/**
 * Check if a member needs to complete onboarding (missing name or house)
 */
export async function needsOnboarding(email: string): Promise<boolean> {
	const member = await getMemberByEmail(email);
	if (!member) return true;
	return !member.name || !member.house;
}
