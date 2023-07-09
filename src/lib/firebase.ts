// NOTE: This is the Firebase CLIENT Setup
import { initializeApp } from 'firebase/app';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { derived, writable, type Readable } from 'svelte/store';

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

/**
 * @param {string} path document path or reference
 * @returns a store with realtime updates on document data
 */
export function docStore<T>(path: string) {
	let unsubscribe: () => void;

	const docRef = doc(db, path);

	const { subscribe } = writable<T | null>(null, (set) => {
		unsubscribe = onSnapshot(docRef, (snapshot) => {
			set((snapshot.data() as T) ?? null);
		});

		return () => unsubscribe();
	});

	// NOTE: This is returning our docStore object.
	return {
		subscribe,
		ref: docRef,
		id: docRef.id
	};
}

interface UserData {
	username: string;
	bio: string;
	photoURL: string;
	links: any[];
}

// We want to subscribe to a document that also includes
// the current user's userID, so we can Svelte's derived()
// to create a derived store. This allows us to access the
// user document and username in real-time.
export const userData: Readable<UserData | null> = derived(user, ($user, set) => {
	// Return a subscription to another store
	if ($user) {
		return docStore<UserData>(`users/${$user.uid}`).subscribe(set);
	} else {
		set(null);
	}
});
