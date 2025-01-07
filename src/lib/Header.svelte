<!-- Author: Addison Steen -->

<script lang="ts">
	import RedirectButton from '$lib/redirectButton.svelte';
	import { page } from '$app/stores';
	import SignInIcon from "$lib/icon/SignIn.svelte";
	import SignOutIcon from "$lib/icon/SignOut.svelte";
</script>

<div id="wrapper">
	<div class="parallax"></div>
	<div id="navbar">
		<ul style="display: inline-block; margin: auto">
			<RedirectButton className="btn bg-navbarColor text-white" name="Home" target="/" />
			<RedirectButton
				className="btn bg-navbarColor text-white"
				name="House Rankings"
				target="/ranking"
			/>
			<RedirectButton
				className="btn bg-navbarColor text-white"
				name="Upcoming Events"
				target="/events"
			/>
			<RedirectButton
				className="btn bg-navbarColor text-white"
				name="Calendar"
				target="/calendar"
			/>
			<RedirectButton
				className="btn bg-navbarColor text-white"
				name="Activity Signup"
				target="/signup"
			/>
			<RedirectButton className="btn bg-navbarColor text-white" name="Houses" target="/houses" />
		</ul>
		<ul style="float:right; height: 100%">
			<!-- signin message -->
			{#if $page.data.session}
				{#if $page.data.session.user?.image}
					<li><img src="{$page.data.session.user.image}" alt="avatar" class="avatar" /></li>
				{/if}
				<li><a href="/auth/signout" class="button-primary" data-sveltekit-preload-data="off"> Sign out <SignOutIcon class="inline-svg" size="1em" /> </a></li>
			{:else}
				<li>
					<a href="/auth/signin" class="button-primary" data-sveltekit-preload-data="off"> Sign in <SignInIcon class="inline-svg" size="1em"/></a>
				</li>
			{/if}
		</ul>
	</div>
</div>

<style>
	/*parallax extra credit*/
	.parallax {
		/*Image Source: cntraveler.com/hotels/thailand/ang-thong/four-seasons-resort-koh-samui*/
		/* background-image: url('bg.png'); */
		grid-column-start: 1;
		grid-column-end: 9;
		grid-row-start: 1;
		grid-row-end: 6;
		text-align: center;

		min-height: 20px;
		min-width: 100px;

		background-attachment: fixed;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}

	#wrapper {
		display: grid;
		grid-gap: 5px;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-template-rows: auto auto auto;
	}

	/*Nav Bar*/

	#navbar ul {
		font-size: medium;
		font-family: Times;
		list-style-type: none;
		margin: 0px;
		padding: 10px;
		text-align: center;
	}

	#navbar ul li {
		font-family: Times;
		display: inline;
	}

	#navbar li a {
		font-family: Times;
		text-decoration: none;
		padding: 10px;
		color: #facec5;
		background-color: #a61618;
	}

	#navbar a:hover {
		font-family: Times;
		color: #a61618;
		background-color: #facec5;
	}

	#navbar {
		font-family: Times;
		grid-column-start: 1;
		grid-column-end: 9;
		grid-row-start: 1;
		grid-row-end: 2;
		background-color: #a61618;
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
