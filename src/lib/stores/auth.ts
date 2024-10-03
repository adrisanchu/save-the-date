import { readable } from 'svelte/store';
import { auth } from '$lib/db/firebase';
import { onAuthStateChanged, type User } from 'firebase/auth';

/**
 * A function to create a store for the current user
 * @returns a Promise that resolves when the user is known
 */
function createUserStore() {
	const { subscribe } = readable<User | null>(undefined, (set) => onAuthStateChanged(auth, set));

	const known = new Promise<void>((resolve) => {
		let unsub = () => {};
		unsub = subscribe((user) => {
			if (user !== undefined) {
				resolve();
				unsub();
			}
		});
	});

	return { subscribe, known };
}

/**
 * The store for the current user
 */
export const user = createUserStore();
