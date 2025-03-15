import type { HouseEvent } from '$lib/format';
import { getMember } from '$lib/queryMember';
import { initializeApp } from 'firebase/app';
import { collection, doc, getDoc, getDocs, getFirestore, limit, orderBy, query, QueryConstraint, Timestamp, where } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "cow-says-moo.firebaseapp.com",
    databaseURL: "https://cow-says-moo-default-rtdb.firebaseio.com",
    projectId: "cow-says-moo",
    storageBucket: "cow-says-moo.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
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
                parsed.timestamp = new Timestamp(
                    parsed.timestamp.seconds,
                    parsed.timestamp.nanoseconds
                );
            }
            // Restore date objects in events which were serialized
            if (parsed.events) {
                parsed.events.forEach((event: HouseEvent) => {
                    event.dateStart = new Timestamp(
                        event.dateStart.seconds,
                        event.dateStart.nanoseconds
                    );
                    event.dateEnd = new Timestamp(
                        event.dateEnd.seconds,
                        event.dateEnd.nanoseconds
                    );
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

        const isTimestampMatching = localTimestamp &&
            serverTimestamp.seconds === localTimestamp.seconds &&
            serverTimestamp.nanoseconds === localTimestamp.nanoseconds;

        if (eventsCache.events && isTimestampMatching) {
            console.log('Timestamps match - using cached events');
            return eventsCache.events;
        }

        console.log('Timestamps different or no cache - fetching fresh events');
        const q = query(collection(db, 'events'), orderBy('dateStart', 'desc'));
        const querySnapshot = await getDocs(q);
        const events = querySnapshot.docs.map(doc => {
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

export async function fetchEventsBetween(end: Date, start?: Date, queryLimit?: number): Promise<HouseEvent[]> {
    const conditions: QueryConstraint[] = [];
    if (start !== undefined) {
        conditions.push(where('dateStart', '>=', start));
    }
    conditions.push(where('dateStart', '<=', end));
    if (queryLimit !== undefined) {
        conditions.push(limit(queryLimit));
    }
    const q = query(
        collection(db, 'events'),
        orderBy('dateStart', 'desc'),
        ...conditions
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
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