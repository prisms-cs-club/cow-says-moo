<script>
	import '../app.css';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import PageTransition from '$lib/pageTransition.svelte';
	import { page } from '$app/stores'; // Import page store to track URL changes

	let { children } = $props();
</script>

<svelte:head>
	<title>PRISMS House Info</title>
</svelte:head>

<Header />

<div id="content">
	<PageTransition url={$page.url.pathname}>
		{@render children()}
	</PageTransition>
</div>

<Footer />

<style>
	#wrapper {
		display: flex;
		flex-direction: column;
		min-height: 96vh;
	}

	#content {
		flex: 1;
		margin: 11% 11%;
		will-change: transform, opacity; /* Optimize for animations */
	}
</style>
