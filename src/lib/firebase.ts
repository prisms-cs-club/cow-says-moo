import type { HouseEvent } from '$lib/format';
import { getMember } from '$lib/queryMember';
import { initializeApp } from 'firebase/app';
import { collection, doc, getDoc, getDocs, getFirestore, limit, orderBy, query, QueryConstraint, where } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA_u-dNDgYCkl-Sh7FW-bj42m9hoW_GRcs",
    authDomain: "cow-says-moo.firebaseapp.com",
    databaseURL: "https://cow-says-moo-default-rtdb.firebaseio.com",
    projectId: "cow-says-moo",
    storageBucket: "cow-says-moo.firebasestorage.app",
    messagingSenderId: "930455928110",
    appId: "1:930455928110:web:fb911ef83dc61712f24ebf"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

async function ifAdmin() { const a = await getMember(); return (a !== undefined && a.role === "admin"); }

export async function fetchEvents(): Promise<HouseEvent[]> {
    // query the database ordered by the start date
    const q = query(collection(db, 'events'), orderBy('dateStart', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
        const data = doc.data() as HouseEvent;
        data.id = doc.id;
        return data;
    });
}

export async function fetchEventsBetween(end: Date, start?: Date, queryLimit?: number): Promise<HouseEvent[]> {
    // query the events whose starting time is before now and ending time is after now
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

export async function createEvent(newEvent: HouseEvent) {
    // TODO
}

export async function updateEvent(updateEvent: HouseEvent) {
    // TODO
}

export async function deleteEvent(deleteEventId: string) {
    // TODO
}

export async function queryScoreSummary(): Promise<{ [key: string]: number }> {
    const response = doc(db, 'summary', 'scores');
    const docRef = await getDoc(response);
    return docRef.data() as { [key: string]: number };
}