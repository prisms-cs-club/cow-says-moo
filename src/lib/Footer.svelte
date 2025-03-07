<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let clickCount = 0;
	let show = false;

	const qwq = [
		'https://github.com/nyctivoe/afqueriqyriqbfas/blob/main/PixPin_2025-01-26_19-15-33.png?raw=true',
		'https://github.com/nyctivoe/afqueriqyriqbfas/blob/main/0bf06dd97ad1f1fc9ef5ecb6302d48d11340190821.png?raw=true',
		'https://github.com/nyctivoe/afqueriqyriqbfas/blob/main/PixPin_2025-02-11_17-44-59.png?raw=true',
		'https://github.com/nyctivoe/afqueriqyriqbfas/blob/main/PixPin_2025-02-11_17-46-07.png?raw=true'
	];
	let randomImage = qwq[0];

	function handleFooterClick() {
		clickCount++;
		if (clickCount === 6) {
			show = true;
			clickCount = 0;
			randomImage = qwq[Math.floor(Math.random() * qwq.length)];
		}
	}

	function handleDocumentClick(event: MouseEvent) {
		const target = event.target as Element;
		if (show && target && !target.closest('footer')) {
			show = false;
		}
	}

	onMount(() => {
		if (browser) {
			document.addEventListener('click', handleDocumentClick);
		}
	});

	onDestroy(() => {
		if (browser) {
			document.removeEventListener('click', handleDocumentClick);
		}
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<footer
	class="no-select footer bg-base-200 p-10 text-base-content"
	on:click|stopPropagation={handleFooterClick}
>
	<aside class="grid-flow-col items-center">
		<p>Copyright © PRISMS CS Club {new Date().getFullYear()} - All right reserved</p>
	</aside>
</footer>

{#if show}
	<div class="special">
		<img src={randomImage} alt=":)" />
	</div>
{/if}

<style>
	.special {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.8);
		z-index: 1000;
	}

	.special img {
		max-width: 80%;
		max-height: 80%;
	}

	/* Prevent text selection */
	.no-select {
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
</style>
