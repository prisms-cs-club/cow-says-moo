<script>
	import { Motion } from 'svelte-motion';
	let data = $props();
	let key = $derived(data.url);
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
			{@render data.children()}
		</div>
	</Motion>
{/key}

<style>
	.transition-container {
		position: relative;
	}

	:global(.transition-pending) {
		opacity: 0;
	}
</style>
