<script>
	import { goto } from '$app/navigation';

	/**
	 * @param {string | URL} where
	 */
	function redirect(where) {
		goto(where);
	}

	export let name = 'Undefined';
	export let target = '404';
	export let className = 'btn';
</script>

<button class={className} on:click={() => redirect(target)}>
	{name}
</button>
