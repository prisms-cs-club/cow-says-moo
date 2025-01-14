<script>
	import '../app.css';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	let { children } = $props();
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
	<Footer />
</div>

<style>
	#wrapper {
		display: flex;
		flex-direction: column;
		min-height: 96vh;
	}

	#content {
		flex: 1;
		margin: 5% 12%;
	}
</style>
