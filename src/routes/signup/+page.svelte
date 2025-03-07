<script lang="ts">
    import type { Member, HouseEvent } from '$lib/format';
    import { onMount } from 'svelte';
    import { getMember } from '$lib/queryMember';
    import { fetchEvents } from '$lib/queryEvents';
	import { formatDate } from '$lib/utils';

    let user: Member = undefined;
    let events: HouseEvent[] = [];
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
        <p>You are not logged in</p>
    {:else}
        <p>Hi {user.name}</p>
        
        <!-- Display all events with their respective sign-up buttons -->
        {#if events.length > 0}
            {#each events as event}
                <div class="activity">
                    <h3>{event.title}</h3>
                    <!-- Display the event description -->
                    <p>{event.description}</p>
                    <p>Date: {formatDate(event)}</p>
                    <button 
                        class="btn btn-primary" 
                        on:click={() => window.location.href = 'https://www.signupgenius.com/pricing?utm_medium=cpc&utm_source=google&utm_campaign=Search_Branded_US_Purchases_JG_PricingLP-g-ads&utm_content=sign%20up%20genius_e_c&utm_term=sign%20up%20genius&hsa_acc=9701405886&hsa_cam=21353676888&hsa_grp=161908450966&hsa_ad=701634338084&hsa_src=g&hsa_tgt=kwd-24305469124&hsa_kw=sign%20up%20genius&hsa_mt=e&hsa_net=adwords&hsa_ver=3&gad_source=1&gclid=CjwKCAiA2JG9BhAuEiwAH_zf3kjpVeB8oZ4U0vq1XVLmIwQHmEzbRTwHEHIqX9e_sW0Gm2PGJW-ujRoCnS0QAvD_BwE'}>
                        Sign Up Here
                    </button>
                </div>
            {/each}
        {:else}
            <p>No events available at the moment.</p>
        {/if}
    {/if}
{:else}
    <p>Loading...</p>
    <span class="loading loading-bars loading-lg"></span>
{/if}

<style>
    /* Using the provided color scheme */
    :root {
        --color-nav-bar-bg: #a61618;
        --color-nav-bar-fg: #facec5;
        --light-beige-pink: #fae5e1;
    }

    .activity {
        margin-top: 20px;
        padding: 20px;
        background-color: var(--light-beige-pink); /* Light beige-pink background */
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
    }

    .activity h3 {
        font-size: 1.5rem;
        color: var(--color-nav-bar-bg);
        margin-bottom: 10px;
    }

    .activity p {
        margin-bottom: 10px;
        color: #a61618;
    }

    .activity button {
        background-color: var(--color-nav-bar-bg);
        color: var(--color-nav-bar-fg);
        padding: 10px 15px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .activity button:hover {
        background-color: #811b1c; /* Slightly darker red */
    }

    .activity button:focus {
        outline: none;
    }
</style>

