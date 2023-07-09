<script lang="ts">
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { db, user } from '$lib/firebase';
	import { doc, getDoc, getDocs, writeBatch } from 'firebase/firestore';

	// TODO: Errors connecting to Firebase when choosing username.
	// Read git log for details.

	let username = '';
	let loading = false;
	let isAvailable = false;
	let debounceTimer: NodeJS.Timeout;

	const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

	$: isValid = username?.length > 2 && username.length < 16 && re.test(username);
	$: isTouched = username.length > 0;
	$: isTaken = isValid && !isAvailable && !loading;

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
		batch.set(doc(db, 'usernames', username), { uid: $user?.uid });
		batch.set(doc(db, 'users', $user!.uid), {
			username,
			photoURL: $user?.photoURL ?? null,
			published: true,
			bio: 'I am the penguin',
			links: [
				{
					title: 'Testy test',
					url: 'google.com',
					icon: 'custom'
				}
			]
		});

		// Execute our batch write code
		await batch.commit();

		// Reset some values
		username = '';
		isAvailable = false;
	}
</script>

<AuthCheck>

  {#if $userData.username}
    <p>
      Your username is <span>@{$userData.username}</span>
    </p>
  {:else}
	<form action="" class="w-2/5" on:submit|preventDefault={confirmUsername}>
		<input
			type="text"
			placeholder="Username"
			class="input w-full"
			class:input-error={!isValid && isTouched}
			class:input-warning={isTaken}
			class:input-success={isAvailable && isValid && !loading}
			bind:value={username}
			on:input={checkAvailability}
		/>

		<div class="my-4 min-h-16 px-8 w-full">
			{#if loading}
				<p>
					Is available? <span class={isAvailable ? 'text-primary' : 'text-warning'}
						>{isAvailable}</span
					>
				</p>
			{/if}

			{#if !isValid && isTouched}
				<p class="text-error text-sm">Must be 3-16 characters long, alphanumeric only.</p>
			{/if}

			{#if isValid && !isAvailable && !loading}
				<p class="text-warning text-sm">@{username} is not available.</p>
			{/if}

			{#if isAvailable}
				<button class="btn btn-success">Confirm username: @{username}</button>
			{/if}
		</div>
	</form>
</AuthCheck>
