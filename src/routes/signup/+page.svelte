<script lang="ts">
	import type { Member, Event } from '$lib/format'
    import { onMount } from 'svelte';
    import { getMember } from '$lib/queryMember'
	import { fetchEvents } from '$lib/queryEvents';

    let user : Member = undefined;
    let events : Event[] = [];

	onMount(async () => {
        user = await getMember();
        if (user !== undefined)
            events = await fetchEvents();
    });
</script>

{#if user === undefined}
    <p>you are not logged in</p>
{:else}
    <p>hi {user.name}</p>
    <ul>
        {#each events as event}
            <li>{event.title}</li>
        {/each}
    </ul>
{/if}