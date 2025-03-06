import type { HouseEvent } from '$lib/format';
import { getMember } from '$lib/queryMember';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore';

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

export async function fetchEvents() {
    // query the database ordered by the start date
    const q = query(collection(db, 'events'), orderBy('dateStart', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as HouseEvent);
}

export async function fetchEventById(id: string) {
    const q = query(collection(db, 'events'), where('id', '==', id));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as HouseEvent);
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