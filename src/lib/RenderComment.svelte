<!-- Author: Jammy -->

<script lang="ts">
	let { page } = $props();

	import Comment from '$lib/Comment.svelte';

	let json_obj = JSON.parse(page);
</script>

<div class="mockup-window border border-base-300">
	<div class="justify-left flex border-t border-base-300 px-4 py-1">{json_obj.title}</div>
	<div class="border-base-0 justify-left flex border-t px-4 py-1">
		Date of writing: {json_obj.date}
	</div>
	<div class="border-base-0 justify-left flex border-t px-4 py-1">
		Written by: {json_obj.author}
	</div>
</div>
<div class="mockup-code">
	<pre data-prefix="~"><code>{json_obj.content}</code>
  </pre>
</div>
<Comment source_page="/test"></Comment>
