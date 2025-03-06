<script>
	import { Motion } from 'svelte-motion';
	export let url = '';

	// This key will change when the URL changes, causing a re-render
	$: key = url;
</script>

{#key key}
	<Motion
		animate={{
			y: [50, 0],
			opacity: [0, 1]
		}}
		initial={{
			y: 50,
			opacity: 0
		}}
		exit={{
			opacity: 0,
			transition: { duration: 1.0 }
		}}
		transition={{
			duration: 0.5,
			delay: 0.1
		}}
		let:motion
	>
		<div class="transition-container" use:motion>
			<slot></slot>
		</div>
	</Motion>
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
