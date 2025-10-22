<script lang="ts">
	import { onMount } from 'svelte';
	import { animate } from 'animejs';

	let data = $props();
	let key = $derived(data.url);
	let container: HTMLDivElement | undefined = $state();

	onMount(() => {
		// Animate in on mount
		if (container) {
			animate(container, {
				translateY: [50, 0],
				opacity: [0, 1],
				duration: 500,
				delay: 100,
				easing: 'out(2)'
			});
		}
	});

	// Re-run animation when key changes
	$effect(() => {
		key; // Subscribe to key changes
		if (container) {
			// Reset and animate
			animate(container, {
				translateY: [50, 0],
				opacity: [0, 1],
				duration: 500,
				delay: 100,
				easing: 'out(2)'
			});
		}
	});
</script>

{#key key}
	<div class="transition-container" bind:this={container}>
		{@render data.children()}
	</div>
{/key}

<style>
	.transition-container {
		position: relative;
	}
</style>
