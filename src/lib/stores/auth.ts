import { writable } from 'svelte/store';
import { auth } from '$lib/db/firebase';
import { onAuthStateChanged, type User } from 'firebase/auth';

function createAuthStore() {
	const { subscribe, set } = writable<User | null>(null);

	onAuthStateChanged(auth, (user) => {
		if (user) {
			// User is signed in
			console.log('user already signed in', user.uid);
		} else {
			console.log('setting user: ', user);
			set(user);
		}
	});

	return {
		subscribe,
		set
	};
}

export const user = createAuthStore();
