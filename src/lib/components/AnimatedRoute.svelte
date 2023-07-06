<script>
	import { fly } from 'svelte/transition';
	import { page } from '$app/stores';

	// NOTE: '#key' is handy it will rebuild its children
	// whenever the value on the right ($page.url) changes.
</script>

{#key $page.url}
	<div in:fly={{ x: '-100%', duration: 500 }}>
		<slot />
	</div>
{/key}
