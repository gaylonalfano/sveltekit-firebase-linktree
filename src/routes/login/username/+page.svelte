<script lang="ts">
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { db } from '$lib/firebase';
	import { userStore } from '$lib/stores/user-store';
	import { doc, getDoc, getDocs, writeBatch } from 'firebase/firestore';

	let username = '';
	let loading = false;
	let isAvailable = false;

	let debounceTimer: NodeJS.Timeout;

	async function checkAvailability() {
		isAvailable = false;
		clearTimeout(debounceTimer);

		loading = true;

		// NOTE: Adding a debounce. Debounce will only run once
		// user has stopped typing for certain amount of time.
		debounceTimer = setTimeout(async () => {
			console.log('Checking availability of: ', username);

			const ref = doc(db, 'usernames', username);
			const exists = await getDoc(ref).then((doc) => doc.exists());

			isAvailable = !exists;
			loading = false;
		}, 500);
	}

	async function confirmUsername() {
    // NOTE: Important to update/write FB docs atomically,
    // since we create TWO documents: username, user data
    // If one fails, then both fail. Gotta use batch write.
		console.log(`Confirming username: ${username} ...`);
    const batch = writeBatch(db);

	}
</script>

<AuthCheck>
	<h2>Username</h2>

	<form action="" class="w-2/5" on:submit|preventDefault={confirmUsername}>
		<input
			type="text"
			placeholder="Username"
			class="input w-full"
			bind:value={username}
			on:input={checkAvailability}
		/>

		<p>
			Is available? <span class={isAvailable ? 'text-primary' : 'text-warning'}>{isAvailable}</span>
		</p>
	</form>
</AuthCheck>
