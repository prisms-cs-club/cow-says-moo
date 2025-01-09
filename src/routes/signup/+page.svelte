<script lang="ts">
	import type { Member, Event } from '$lib/format'
    import { onMount } from 'svelte';
    import { getMember } from '$lib/queryMember'
	import { fetchEvents } from '$lib/queryEvents';

    let user : Member = undefined;
    let events : Event[] = [];
    let loaded = false;

	onMount(async () => {
        user = await getMember();
        if (user !== undefined)
            events = await fetchEvents();
        loaded = true;
    });
</script>

{#if loaded}
    {#if user === undefined}
        <p>you are not logged in</p>
    {:else}
        <p>hi {user.name}</p>
        <ul>
            {#each events as event}
                <li><a href="/events/{event.title}">{event.title} - {event.dateStart}</a></li>
            {/each}
        </ul>
    {/if}
{:else}
    <p>loading...</p>
    <span class="loading loading-bars loading-lg"></span>
{/if}