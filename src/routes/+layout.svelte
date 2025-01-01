<script>
	import '../app.css';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	let { children } = $props();
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>PRISMS House Info</title>
</svelte:head>

<div id="wrapper">
	<div id="header">
		<Header />
	</div>
	<div id="content">
		{@render children()}
	</div>
	<div id="footer">
		<Footer />
	</div>
</div>

<style>
	#wrapper {
		display: flex;
		flex-direction: column;
		min-height: 96vh;
	}

	#content {
		flex: 1;
	}

	#footer {
		background-color: #f8f8f8;
		padding: 10px;
		text-align: center;
	}
</style>
