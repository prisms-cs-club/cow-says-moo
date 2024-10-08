<script lang="ts">
	let count = 0;

	function increment() {
		count++;
	}
</script>

<div class="py-6">
	<span class="countdown font-mono text-6xl">
		<span style="--value:{count};"></span>
	</span>
</div>
<button class="btn btn-primary" on:click={increment}>Increase count</button>
