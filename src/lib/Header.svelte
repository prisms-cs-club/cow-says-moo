<!-- Author: Addison Steen -->

<script lang="ts">
	import { page } from '$app/stores';
	import SignInIcon from "$lib/icon/SignIn.svelte";
	import SignOutIcon from "$lib/icon/SignOut.svelte";
	import { onMount } from 'svelte';

	onMount(() => {
		
	});
</script>

<div id="wrapper" class="sticky">
	<div id="navbar">
		<ul style="display: inline-block; margin-left: 5%;">
			<li><a class="button-primary" href="/">Home</a></li>
			<li><a class="button-primary" href="/houses">Houses & Rankings</a></li>
			<li><a class="button-primary" href="/events">Upcoming Events</a></li>
			<li><a class="button-primary" href="/calendar">Calendar</a></li>
			<li><a class="button-primary" href="/signup">Activity Signup</a></li>
		</ul>
		<ul style="float:right; height: 100%; margin-right: 5%;">
			<!-- signin message -->
			{#if $page.data.session}
				{#if $page.data.session.user?.image}
					<li><img src="{$page.data.session.user.image}" alt="avatar" class="avatar" /></li>
				{/if}
				<li><a href="/auth/signout" class="button-primary" data-sveltekit-preload-data="off"> Sign Out <SignOutIcon class="inline-svg" size="1em" /> </a></li>
			{:else}
				<li>
					<a href="/auth/signin" class="button-primary" data-sveltekit-preload-data="off"> Sign In <SignInIcon class="inline-svg" size="1em"/></a>
				</li>
			{/if}
		</ul>
	</div>
</div>

<style>
	:root {
		--color-nav-bar-bg: #a61618;
		--color-nav-bar-fg: #facec5;
	}

	#wrapper {
		display: grid;
		grid-gap: 5px;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-template-rows: auto auto auto;
	}

	#wrapper.sticky {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 1000;
	}

	/*Nav Bar*/

	#navbar ul {
		list-style-type: none;
		margin: 0px;
		padding: 0px;
		text-align: center;
	}

	#navbar ul li {
		display: inline;
	}

	#navbar li a {
		text-decoration: none;
		padding: 18px 15px;
		color: var(--color-nav-bar-fg);
		background-color: var(--color-nav-bar-bg);
	}

	#navbar a:hover {
		color: var(--color-nav-bar-bg);
		background-color: var(--color-nav-bar-fg);
	}

	#navbar {
		grid-column-start: 1;
		grid-column-end: 9;
		grid-row-start: 1;
		grid-row-end: 2;
		background-color: var(--color-nav-bar-bg);
	}

	/*image*/
	img.avatar {
		border-radius: 50%;
		display: inline-block;
		height: 2.1em;
		width: 2.1em;
		vertical-align: center;
	}

	a.button-primary {
		display: inline-block;
		vertical-align: center;
	}
</style>
