<script lang="ts">
	import '../app.css';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	let { children } = $props();
</script>

<div id="header">
	<Header />
</div>
<div id="content">
	{@render children()}
</div>
<div id="footer">
	<Footer />
</div>
