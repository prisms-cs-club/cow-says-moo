<script>
	import '../app.css';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	let { children } = $props();
	import { page } from '$app/stores';
</script>

{#if $page.data.session}
	{#if $page.data.session.user?.image}
		<span style="background-image: url('{$page.data.session.user.image}')" class="avatar" />
	{/if}

	<span>
		<small>Signed in as</small>
		<br />
		<strong>
			{$page.data.session.user?.email ?? $page.data.session.user?.name}
		</strong>
	</span>

	<a href="/auth/signout" class="button" data-sveltekit-preload-data="off"> Sign out </a>
{:else}
	<span class="notSignedInText"> You are not signed in </span>

	<a href="/auth/signin" class="buttonPrimary" data-sveltekit-preload-data="off"> Sign in </a>
{/if}

<!-- <div id="wrapper">
	<div id="header">
		<Header />
	</div>
	<div id="content">
		{@render children()}
	</div>
	<div id="footer">
		<Footer />
	</div>
</div> -->

<style>
	#wrapper {
		display: flex;
		flex-direction: column;
		min-height: 96vh;
	}

	#content {
		flex: 1;
	}

	#footer {
		background-color: #f8f8f8;
		padding: 10px;
		text-align: center;
	}
</style>
