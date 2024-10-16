<script>
	import Counter from '$lib/Counter.svelte';
	export let data;
</script>

<!-- center aligned -->
<h1 class="text-center">Hi {data.name}</h1>

<p>This is a paragraph</p>
<p>This is a paragraph with <strong>bold</strong> and <em>italic</em> text</p>

<Counter />
<Counter />
