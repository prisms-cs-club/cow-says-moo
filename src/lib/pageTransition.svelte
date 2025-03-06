<script>
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	export let url = '';

	// This key will change when the URL changes, causing a re-render
	$: key = url;
</script>

{#key key}
	<div
		class="transition-container"
		in:fly={{ y: 50, duration: 500, delay: 100, easing: cubicOut }}
		out:fade={{ duration: 0 }}
	>
		<slot></slot>
	</div>
{/key}

<style>
	/* Hide initial state before transition starts */
	.transition-container {
		position: relative;
	}

	/* Ensure content doesn't show before animation starts */
	:global(.transition-pending) {
		opacity: 0;
	}
</style>
