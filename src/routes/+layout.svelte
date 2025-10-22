<script lang="ts">
	import '../app.css';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import { onNavigate } from '$app/navigation';

	let { children } = $props();

	// Use View Transitions API for all page transitions
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<title>PRISMS House Info</title>
</svelte:head>

<Header />

<div id="content">
	{@render children()}
</div>

<Footer />

<style>
	#content {
		flex: 1;
		margin: 8% 11%;
	}
</style>
