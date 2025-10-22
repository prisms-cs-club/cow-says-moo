<script lang="ts">
	import { page } from '$app/stores';
	import SignInIcon from '$lib/icon/SignIn.svelte';
	import SignOutIcon from '$lib/icon/SignOut.svelte';
	import { Button } from '$lib/components/ui/button';
	import { animate } from 'animejs';

	let innerWidth = $state(0);
	let mobile = $state(false);
	let mobileMenuOpen = $state(false);
	let animating = $state(false);
	let dropdownElement: HTMLUListElement | undefined = $state();

	$effect(() => {
		// Check initial screen size on mount
		checkScreenSize();
	});

	// Animate dropdown when mobileMenuOpen changes
	$effect(() => {
		if (dropdownElement) {
			if (mobileMenuOpen) {
				// Opening animation
				animate(dropdownElement, {
					scaleY: [0, 1],
					opacity: [0, 1],
					duration: 300,
					easing: 'out(2)'
				});
			} else {
				// Closing animation
				animate(dropdownElement, {
					scaleY: [1, 0],
					opacity: [1, 0],
					duration: 300,
					easing: 'in(2)'
				});
			}
		}
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
	function delay(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	// Normalize Google avatar URLs and ensure a stable size
	function normalizeAvatar(url: string | undefined): string | undefined {
		if (!url) return url;
		try {
			const u = new URL(url);
			if (u.hostname.endsWith('googleusercontent.com')) {
				// If no size specified, request a reasonable one
				if (!u.searchParams.has('sz')) u.searchParams.set('sz', '96');
				return u.toString();
			}
		} catch (_) {
			// fall through to original
		}
		return url;
	}

	let avatarUrl = $derived(normalizeAvatar($page.data.session?.user?.image));
	let isAdmin = $derived($page.data.isAdmin ?? false);
</script>

<svelte:window bind:innerWidth onresize={checkScreenSize} />

<div id="header" class="fixed top-0 right-0 left-0 z-50 w-full px-4 py-2">
	<div
		class="custom-navbar flex items-center justify-between rounded-lg px-4 py-3 shadow-lg backdrop-blur-md"
	>
		<!-- Mobile menu -->
		<div class="flex items-center">
			{#if mobile}
				<div class="relative">
					<Button
						variant="ghost"
						size="icon"
						class="{mobileMenuOpen ? 'active' : ''} text-accent-content lg:hidden"
						aria-label="Toggle mobile menu"
						onclick={toggleMobileMenu}
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
					</Button>

					{#if mobileMenuOpen}
						<ul
							bind:this={dropdownElement}
							class="custom-navbar-dropdown absolute top-full left-0 z-[1] mt-3 w-52 rounded-lg p-2 shadow-lg"
							style="transform-origin: top;"
						>
							<li class="mb-2">
								<a
									href="/"
									class="nav-link block rounded px-4 py-3 text-lg font-medium"
									onclick={closeMobileMenu}>Home</a
								>
							</li>
							<li class="mb-2">
								<a
									href="/houses"
									class="nav-link block rounded px-4 py-3 text-lg font-medium"
									onclick={closeMobileMenu}>Houses & Rankings</a
								>
							</li>
							<li class="mb-2">
								<a
									href="/events"
									class="nav-link block rounded px-4 py-3 text-lg font-medium"
									onclick={closeMobileMenu}>Events</a
								>
							</li>
							<li class="mb-2">
								<a
									href="/calendar"
									class="nav-link block rounded px-4 py-3 text-lg font-medium"
									onclick={closeMobileMenu}>Calendar</a
								>
							</li>
							{#if isAdmin}
								<li class="mb-2">
									<a
										href="/admin"
										class="nav-link block rounded px-4 py-3 text-lg font-medium"
										onclick={closeMobileMenu}>Admin Panel</a
									>
								</li>
							{/if}
						</ul>
					{/if}
				</div>
			{/if}
		</div>

		<!-- Desktop nav links -->
		<div class="hidden lg:flex">
			<ul class="flex items-center gap-2 px-1">
				<li>
					<a href="/" class="nav-link block rounded px-5 py-3 text-lg font-medium">Home</a>
				</li>
				<li>
					<a href="/houses" class="nav-link block rounded px-5 py-3 text-lg font-medium"
						>Houses & Rankings</a
					>
				</li>
				<li>
					<a href="/events" class="nav-link block rounded px-5 py-3 text-lg font-medium">Events</a>
				</li>
				<li>
					<a href="/calendar" class="nav-link block rounded px-5 py-3 text-lg font-medium"
						>Calendar</a
					>
				</li>
				{#if isAdmin}
					<li>
						<a href="/admin" class="nav-link block rounded px-5 py-3 text-lg font-medium"
							>Admin Panel</a
						>
					</li>
				{/if}
			</ul>
		</div>

		<!-- Auth links -->
		<div class="flex items-center">
			{#if $page.data.session}
				<div class="flex items-center gap-3">
					{#if avatarUrl}
						<img
							src={avatarUrl}
							alt="avatar"
							referrerpolicy="no-referrer"
							class="border-accent-content h-10 w-10 rounded-full border-2"
						/>
					{/if}
					<Button
						variant="ghost"
						class="auth-btn px-5 py-2 text-lg font-medium"
						href="/auth/signout"
						data-sveltekit-preload-data="off"
					>
						Sign Out <SignOutIcon class="ml-2" size="1em" />
					</Button>
				</div>
			{:else}
				<Button
					variant="ghost"
					class="auth-btn px-5 py-2 text-lg font-medium"
					href="/auth/signin"
					data-sveltekit-preload-data="off"
				>
					Sign In <SignInIcon class="ml-2" size="1em" />
				</Button>
			{/if}
		</div>
	</div>
</div>

<style>
	#header {
		view-transition-name: header;
	}

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

	/* Hamburger button active state */
	:global(button.active) {
		background-color: rgba(250, 206, 197, 0.2) !important;
	}

	/* Remove old animation classes as we're using Motion component now */
</style>
