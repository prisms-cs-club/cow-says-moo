<script lang="ts">
	import { page } from '$app/stores';
	import SignInIcon from '$lib/icon/SignIn.svelte';
	import SignOutIcon from '$lib/icon/SignOut.svelte';
	import { onMount } from 'svelte';
	import { Motion } from 'svelte-motion';

	let innerWidth = 0;
	let mobile = false;
	let mobileMenuOpen = false;
	let animating = false;

	onMount(() => {
		// Check initial screen size
		checkScreenSize();
	});

	function checkScreenSize() {
		mobile = innerWidth < 768;
		// Close mobile menu when switching to desktop
		if (!mobile) mobileMenuOpen = false;
	}

	async function toggleMobileMenu() {
		if (animating) return;
		animating = true;

		if (mobileMenuOpen) {
			mobileMenuOpen = false;
			await delay(500); // Increased delay for 0.5s collapse animation
		} else {
			mobileMenuOpen = true;
		}
		animating = false;
	}

	function closeMobileMenu() {
		if (animating) return;
		mobileMenuOpen = false;
	}

	// Delay function for animation
	function delay(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	// Animation variants for dropdown menu
	const dropdownVariants = {
		open: {
			scaleY: 1,
			opacity: 1,
			transition: { duration: 0.3, ease: 'easeOut' }
		},
		closed: {
			scaleY: 1,
			opacity: 0,
			transition: { duration: 0.3, ease: 'easeIn' }
		}
	};
</script>

<svelte:window bind:innerWidth on:resize={checkScreenSize} />

<div class="fixed left-0 right-0 top-0 z-50 w-full px-4 py-2">
	<div class="custom-navbar navbar rounded-lg shadow-lg backdrop-blur-md">
		<!-- Mobile menu -->
		<div class="navbar-start">
			{#if mobile}
				<div class="dropdown">
					<button
						class="btn btn-ghost text-accent-content lg:hidden"
						aria-label="Toggle mobile menu"
						class:active={mobileMenuOpen}
						on:click={toggleMobileMenu}
						disabled={animating}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</button>

					<Motion
						animate={mobileMenuOpen ? 'open' : 'closed'}
						variants={dropdownVariants}
						initial="closed"
					>
						<ul
							class="custom-navbar-dropdown menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box p-2 shadow"
						>
							<li>
								<a href="/" class="nav-link text-lg font-medium" on:click={closeMobileMenu}>Home</a>
							</li>
							<li>
								<a href="/houses" class="nav-link text-lg font-medium" on:click={closeMobileMenu}
									>Houses & Rankings</a
								>
							</li>
							<li>
								<a href="/events" class="nav-link text-lg font-medium" on:click={closeMobileMenu}
									>Events</a
								>
							</li>
							<li>
								<a href="/calendar" class="nav-link text-lg font-medium" on:click={closeMobileMenu}
									>Calendar</a
								>
							</li>
						</ul>
					</Motion>
				</div>
			{/if}
		</div>

		<!-- Desktop nav links -->
		<div class="navbar-center hidden lg:flex">
			<ul class="menu menu-horizontal gap-2 px-1">
				<li>
					<a href="/" class="nav-link px-5 py-3 text-lg font-medium">Home</a>
				</li>
				<li>
					<a href="/houses" class="nav-link px-5 py-3 text-lg font-medium">Houses & Rankings</a>
				</li>
				<li>
					<a href="/events" class="nav-link px-5 py-3 text-lg font-medium">Events</a>
				</li>
				<li>
					<a href="/calendar" class="nav-link px-5 py-3 text-lg font-medium">Calendar</a>
				</li>
			</ul>
		</div>

		<!-- Auth links -->
		<div class="navbar-end">
			{#if $page.data.session}
				<div class="flex items-center">
					{#if $page.data.session.user?.image}
						<img
							src={$page.data.session.user.image}
							alt="avatar"
							class="mr-3 h-10 w-10 rounded-full border-2 border-accent-content"
						/>
					{/if}
					<a
						href="/auth/signout"
						class="auth-btn btn btn-ghost px-5 py-2 text-lg font-medium"
						data-sveltekit-preload-data="off"
					>
						Sign Out <SignOutIcon class="ml-2" size="1em" />
					</a>
				</div>
			{:else}
				<a
					href="/auth/signin"
					class="auth-btn btn btn-ghost px-5 py-2 text-lg font-medium"
					data-sveltekit-preload-data="off"
				>
					Sign In <SignInIcon class="ml-2" size="1em" />
				</a>
			{/if}
		</div>
	</div>
</div>

<style>
	.custom-navbar {
		background-color: rgba(166, 22, 24, 0.85);
	}

	.custom-navbar-dropdown {
		background-color: rgba(166, 22, 24, 0.95);
		overflow: hidden;
	}

	:global(.custom-navbar .text-accent-content) {
		color: #facec5 !important;
	}

	:global(.nav-link) {
		color: #facec5 !important;
		transition: all 0.3s ease !important;
		position: relative !important;
		overflow: hidden !important;
	}

	:global(.nav-link:hover) {
		color: rgba(166, 22, 24) !important;
		background-color: #facec5 !important;
		transform: translateY(-2px) !important;
	}

	:global(.nav-link:active) {
		transform: translateY(0) !important;
	}

	/* Create underline animation effect */
	:global(.nav-link::after) {
		content: '' !important;
		position: absolute !important;
		bottom: 0 !important;
		left: 50% !important;
		width: 0 !important;
		height: 2px !important;
		background-color: #facec5 !important;
		transition: all 0.3s ease !important;
		transform: translateX(-50%) !important;
	}

	:global(.nav-link:hover::after) {
		width: 80% !important;
	}

	/* Auth button animations */
	:global(.auth-btn) {
		color: #facec5 !important;
		transition: all 0.3s ease !important;
		border: 1px solid transparent !important;
	}

	:global(.auth-btn:hover) {
		border-color: #facec5 !important;
		box-shadow: 0 0 8px rgba(250, 206, 197, 0.5) !important;
		transform: scale(1.05) !important;
	}

	:global(.auth-btn:active) {
		transform: scale(0.98) !important;
	}

	/* Enhanced navigation link spacing */
	:global(.menu-horizontal) {
		gap: 0.5rem !important;
	}

	:global(.dropdown-content li) {
		margin-bottom: 0.5rem !important;
	}

	:global(.dropdown-content li a) {
		padding: 0.75rem 1rem !important;
	}

	/* Hamburger button active state */
	:global(.btn.active) {
		background-color: rgba(250, 206, 197, 0.2) !important;
	}

	/* Remove old animation classes as we're using Motion component now */
</style>
