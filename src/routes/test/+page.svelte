<!-- Author: Jammy -->

<script lang="ts">
	import RenderComment from '$lib/RenderComment.svelte';
	let test_json_str = `{
"title": "Ettl did great on the frisbee tournament",
"author": "Jammy",
"date": "11/19/24",
"content": "Ettl is excellent! Ettl excels! Ettl wins awards en masse! Ettl is the Everwin!"}`;
</script>

<RenderComment page={test_json_str} />
