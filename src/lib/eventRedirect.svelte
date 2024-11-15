<script>
	import { goto } from '$app/navigation';
	/**
	 * @type {any}
	 */
	export let which;

	function goToEvent() {
		goto(`/event/${which}`);
	}
</script>

<button class="btn btn-neutral" on:click={goToEvent}>{which}</button>
