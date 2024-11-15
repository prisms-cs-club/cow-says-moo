<script>
	import HomeButton from '$lib/homeButton.svelte';
	import EventTemplate from '$lib/eventRedirect.svelte';
	import '../app.css';
</script>

<header>
	<nav>
		<HomeButton />
		<EventTemplate which="current" />
		<a href="/event">Events</a>
		<a href="/ranking">Ranking</a>
	</nav>
</header>

<main>
	<slot></slot>
</main>

<footer>
	<p>Prisms International School of Mathematics and Science 2024</p>
</footer>

<style>
	header {
		background-color: white;
		color: black;
		padding: 1rem;
		font: 'Times New Roman';
		font-size: 20px;
		justify-self: center;
	}

	nav {
		background-color: #f8f9fa;
		padding: 1rem;
		text-align: center;
		position: sticky;
	}

	main {
		display: flex;
		flex-direction: column;
		min-height: 80vh;
	}

	footer {
		background-color: #971d13;
		color: white;
		padding: 0.4rem;
		text-align: center;
		position: sticky;
	}
</style>
