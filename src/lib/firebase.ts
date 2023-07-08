// NOTE: This is the Firebase CLIENT Setup
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

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
