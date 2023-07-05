// https://fireship.io/courses/sveltekit/setup-firebase-admin/?autoplay=true
// NOTE: This is Firebase SERVER (ADMIN) Setup
// You don't need to use this generally, but if you want
// SSR authorization, then this is required.
// NOTE: There is a Firebase Emulator Suite that allows you to
// run FB locally.
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { FB_CLIENT_EMAIL, FB_PRIVATE_KEY, FB_PROJECT_ID } from '$env/static/private';
import pkg from 'firebase-admin';

// Wrap in try/catch so you don't initialize the app
// multiple times
try {
	pkg.initializeApp({
		credential: pkg.credential.cert({
			projectId: FB_PROJECT_ID,
			clientEmail: FB_CLIENT_EMAIL,
			privateKey: FB_PRIVATE_KEY
		})
	});
} catch (err: any) {
	if (!/already exists/u.test(err.message)) {
		console.error('Firebase Admin Error: ', err.stack);
	}
}

// NOTE: Using 'admin' in the var names to distinguish from client
export const adminDB = getFirestore();
export const adminAuth = getAuth();
