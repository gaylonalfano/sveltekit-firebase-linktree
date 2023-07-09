<script>
	import { user, userData } from '$lib/firebase';
	import '../app.css';

	// NOTE: When you subscribe to a SK store, it only
	// triggers a read document in Firestore ONCE, this
	// means you can have as many '$' to the same document
	// as you want/need. Handy!
	// NOTE: Now we can preload global data by subscribing
	// to the stores in this root layout component.
	// REF: https://fireship.io/courses/sveltekit/project-user-data/
	$user;
	$userData;
</script>

<div class="min-h-screen flex flex-col">
	<slot />
</div>
