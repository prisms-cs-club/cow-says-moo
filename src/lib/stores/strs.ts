import { writable } from 'svelte/store';

// Create a store to track Easter egg state
export const showEasterEgg = writable(false);
export const easterEggImage = writable('');

// Function to trigger the Easter egg
export function triggerEasterEgg(imageUrl: string) {
    easterEggImage.set(imageUrl);
    showEasterEgg.set(true);
}

// Function to hide the Easter egg
export function hideEasterEgg() {
    showEasterEgg.set(false);
}
