<!-- Author: Jammy -->

<script lang="ts">
	import { Input } from '$lib/components/ui/input';

	let { source_page } = $props();
</script>

<Input type="text" placeholder="Please speak politely" class="w-full max-w-xs" />
<div class="mb-4 flex items-start gap-2">
	<div class="max-w-xs rounded-lg bg-gray-200 p-3">
		Hello
		<br />
		Hello
	</div>
</div>
<div class="mb-4 flex items-start justify-end gap-2">
	<div class="max-w-xs rounded-lg bg-blue-500 p-3 text-white">Howdy</div>
</div>
