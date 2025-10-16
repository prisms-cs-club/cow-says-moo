<script lang="ts">
	import { load } from './+page';
	import { fetchEventsWonBy } from '$lib/firebase';
	import type { HouseEvent } from '$lib/format';
	import EventGrid from '$lib/EventGrid.svelte';

	let { data } = $props();

	let eventsWon: HouseEvent[] = $state([]);

	$effect.pre(() => {
		(async () => {
			eventsWon = await fetchEventsWonBy(data.house);
		})();
	});
</script>

<h1>House: {data.house}</h1>

<h2>Won by Your House</h2>
<EventGrid events={eventsWon} />
