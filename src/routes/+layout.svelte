<script>
	import Header from './header.svelte';
</script>

<div class="cowsSaysMoo">
	<Header />
	<main>
		<slot />
	</main>
</div>

<style>
	.cowsSaysMoo {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
