// NOTE: This is the Firebase CLIENT Setup
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { writable } from 'svelte/store';

const firebaseConfig = {
	apiKey: 'AIzaSyDbSw0Xk8RpgW70xf5iIrHwFrLY3O7kcPE',
	authDomain: 'sveltekit-firebase-sites.firebaseapp.com',
	projectId: 'sveltekit-firebase-sites',
	storageBucket: 'sveltekit-firebase-sites.appspot.com',
	messagingSenderId: '254282316679',
	appId: '1:254282316679:web:7d8be43d02ca0470fab122'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();

function createUserStore() {
	let unsubscribe: () => void;

	if (!auth || !globalThis.window) {
		console.warn('Auth is not initialized or not in browser');
		const { subscribe } = writable<User | null>(null);
		return {
			subscribe
		};
	}

	const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
		unsubscribe = onAuthStateChanged(auth, (user) => {
			set(user);
		});

		return () => unsubscribe();
	});

	return {
		subscribe
	};
}

export const user = createUserStore();
