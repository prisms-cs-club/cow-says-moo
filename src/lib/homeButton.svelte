<script>
	import { goto } from '$app/navigation';

	const goHome = () => {
		goto('/');
	};
</script>

<button on:click={goHome}>Home</button>

<style>
	button {
		background-color: #007bff;
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		font-size: 1rem;
		cursor: pointer;
		border-radius: 0.25rem;
		justify-self: left;
		justify-content: left;
		justify-items: left;
	}

	button:hover {
		background-color: #0056b3;
	}

	button:active {
		transform: scale(0.95);
	}
</style>
