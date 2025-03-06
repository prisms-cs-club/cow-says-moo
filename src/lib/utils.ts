import type { HouseEvent } from "./format";

export function formatDate(event: HouseEvent): string {
    if(event.dateStart.seconds === event.dateEnd.seconds) {
        return event.dateStart.toDate().toLocaleDateString();
    } else {
        return `${event.dateStart.toDate().toLocaleDateString()} - ${event.dateEnd.toDate().toLocaleDateString()}`;
    }
}