<script lang="ts">
	import { goto } from '$app/navigation';

	function redirect(where: string) {
		goto(where);
	}

	export let name = 'Undefined';
	export let target = '404';
	export let className = 'btn';
</script>

<button class={className} on:click={() => redirect(target)}>
	{name}
</button>
