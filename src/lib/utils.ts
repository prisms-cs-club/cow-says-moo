import type { HouseEvent } from "./format";

export function formatDate(event: HouseEvent): string {
    if (event.dateStart.seconds === event.dateEnd.seconds) {
        return event.dateStart.toDate().toLocaleDateString();
    } else {
        return `${event.dateStart.toDate().toLocaleDateString()} - ${event.dateEnd.toDate().toLocaleDateString()}`;
    }
}

export function numberToRoman(x: number): string {
    if (x === 1) return "I";
    if (x === 2) return "II";
    if (x === 3) return "III";
    if (x === 4) return "IV";
    return "N/A";
}