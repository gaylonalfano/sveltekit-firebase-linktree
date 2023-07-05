<script lang="ts">
	import { Stepper, Step } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
</script>

<Stepper>
	<Step>
		<svelte:fragment slot="header">(header)</svelte:fragment>
		(content)
	</Step>
	<Step>
		<svelte:fragment slot="header">(header)</svelte:fragment>
		(content)
	</Step>
	<Step>
		<svelte:fragment slot="header">(header)</svelte:fragment>
		(content)
	</Step>
</Stepper>

<!-- <nav> -->
<!-- 	<ul> -->
<!-- 		<a href="/login">Sign In</a> -->
<!-- 		<a href="/login/username">Choose Username</a> -->
<!-- 		<a href="/login/photo">Upload Photo</a> -->
<!-- 	</ul> -->
<!-- </nav> -->

<main>
	<div class="card p-4">
		<slot />
	</div>
</main>
