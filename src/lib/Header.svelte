<script lang="ts">
	import { page } from '$app/stores';
	import SignInIcon from '$lib/icon/SignIn.svelte';
	import SignOutIcon from '$lib/icon/SignOut.svelte';
	import { onMount } from 'svelte';

	let scrollY = 0;
	let innerWidth = 0;
	let mobile = false;
	let menuOpen = false;

	onMount(() => {
		// Check initial screen size
		checkScreenSize();
	});

	function checkScreenSize() {
		mobile = innerWidth < 768;
	}

	function toggleMenu() {
		menuOpen = !menuOpen;
	}
</script>

<svelte:window bind:scrollY bind:innerWidth on:resize={checkScreenSize} />

<div id="wrapper" class={scrollY > 20 ? 'floating' : ''}>
	<div id="navbar" class="blur-effect">
		{#if mobile}
			<details class="mobile-menu-toggle dropdown">
				<summary class="btn m-1">=</summary>
				<ul class="z-1 menu dropdown-content w-52 rounded-box bg-base-100 p-2 shadow-sm">
					<li><a>Item 1</a></li>
					<li><a>Item 2</a></li>
				</ul>
			</details>
		{/if}

		<ul class="nav-links {mobile ? 'mobile' : ''} {menuOpen ? 'open' : ''}">
			<li>
				<a class="button-primary" href="/" on:click={() => mobile && (menuOpen = false)}>Home</a>
			</li>
			<li>
				<a class="button-primary" href="/houses" on:click={() => mobile && (menuOpen = false)}
					>Houses & Rankings</a
				>
			</li>
			<li>
				<a class="button-primary" href="/events" on:click={() => mobile && (menuOpen = false)}
					>Upcoming Events</a
				>
			</li>
			<li>
				<a class="button-primary" href="/calendar" on:click={() => mobile && (menuOpen = false)}
					>Calendar</a
				>
			</li>
		</ul>

		<ul class="auth-links {mobile ? 'mobile' : ''} {menuOpen ? 'open' : ''}">
			<!-- signin message -->
			{#if $page.data.session}
				{#if $page.data.session.user?.image}
					<li><img src={$page.data.session.user.image} alt="avatar" class="avatar" /></li>
				{/if}
				<li>
					<a href="/auth/signout" class="button-primary" data-sveltekit-preload-data="off">
						Sign Out <SignOutIcon class="inline-svg" size="1em" />
					</a>
				</li>
			{:else}
				<li>
					<a href="/auth/signin" class="button-primary" data-sveltekit-preload-data="off">
						Sign In <SignInIcon class="inline-svg" size="1em" /></a
					>
				</li>
			{/if}
		</ul>
	</div>
</div>

<style>
	:root {
		--color-nav-bar-bg: rgba(166, 22, 24, 0.85); /* Added transparency */
		--color-nav-bar-fg: #facec5;
		--header-height: 50px;
		--header-padding: 10px;
	}

	#wrapper {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		padding: 10px 20px;
		box-sizing: border-box;
		transition: all 0.3s ease;
		z-index: 1000;
		background-color: transparent;
	}

	#wrapper.floating {
		top: 15px;
		left: 15px;
		right: 15px;
		width: calc(100% - 30px);
		border-radius: 8px;
	}

	/*Nav Bar*/
	#navbar {
		background-color: var(--color-nav-bar-bg);
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 8px;
		padding: 0 15px;
		height: var(--header-height);
		position: relative;
		overflow: hidden;
	}

	/* Blur effect */
	.blur-effect {
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
	}

	.blur-effect::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: var(--color-nav-bar-bg);
		z-index: -1;
	}

	#navbar ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 2;
	}

	.nav-links {
		flex-grow: 1;
		justify-content: flex-start;
		margin-left: 5%;
	}

	.auth-links {
		justify-content: flex-end;
		margin-right: 5%;
	}

	#navbar ul li {
		margin: 0 3px;
	}

	#navbar li a {
		text-decoration: none;
		padding: 8px 12px;
		color: var(--color-nav-bar-fg);
		background-color: transparent;
		border-radius: 4px;
		display: inline-block;
		transition: all 0.2s ease;
		font-size: 0.95em;
		position: relative;
		z-index: 2;
	}

	#navbar a:hover {
		color: var(--color-nav-bar-bg);
		background-color: var(--color-nav-bar-fg);
	}

	img.avatar {
		border-radius: 50%;
		height: 1.8em;
		width: 1.8em;
		display: inline-block;
		vertical-align: middle;
		margin-right: 8px;
		border: 2px solid var(--color-nav-bar-fg);
	}

	a.button-primary {
		display: inline-flex;
		align-items: center;
	}

	.mobile-menu-toggle {
		display: none;
		cursor: pointer;
		width: 24px;
		height: 24px;
		position: relative;
		z-index: 1000;
	}

	@media (max-width: 768px) {
		.mobile-menu-toggle {
			display: block;
		}

		#navbar {
			padding: 0 10px;
		}

		#navbar ul.mobile {
			position: absolute;
			top: calc(var(--header-height) + var(--header-padding));
			left: 0;
			width: 100%;
			flex-direction: column;
			background-color: var(--color-nav-bar-bg);
			backdrop-filter: blur(8px);
			-webkit-backdrop-filter: blur(8px);
			display: none;
			padding: 10px 0;
			border-radius: 0 0 8px 8px;
			box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
		}

		#navbar ul.mobile.open {
			display: flex;
		}

		#navbar ul.mobile li {
			width: 100%;
			margin: 5px 0;
			text-align: center;
		}

		#navbar ul.mobile li a {
			width: 80%;
			padding: 8px 0;
		}

		.auth-links.mobile {
			margin-top: 8px;
			border-top: 1px solid rgba(250, 206, 197, 0.3);
			padding-top: 8px;
		}

		#wrapper.floating {
			top: 10px;
			left: 10px;
			right: 10px;
			width: calc(100% - 20px);
		}
	}

	@media (min-width: 769px) and (max-width: 1024px) {
		#navbar li a {
			padding: 8px 8px;
			font-size: 0.85em;
		}
	}
</style>
