<script lang="ts">
	import type { DataType } from './+page.ts';
	export let data: DataType;
	import RankBar from '$lib/RankBar.svelte';
	// let url = new URL(window.location.href);
	// let event_title = url.searchParams.get('event_title');
	// let event_text = url.searchParams.get('event_text');
</script>

<div id="frame">
	<div id="title_frame">
		<h1 id="title">{data.eventBody.title}</h1>
	</div>
	<div id="text_frame">
		<p id="text">{data.eventBody.description}</p>
	</div>
	<div id="leaderboard">
		<!--
			I changed the leaderboard you made to Ivey's RankBar component, in order to unify the site's design.
			You can see the RankBar component in the src/lib/RankBar.svelte file.
				-- Tom Geng
		-->
		<RankBar albemarle={110} lambert={450} hobler={140} ettl={190} />
	</div>
</div>

<!-- Put your event template code here! -->
<!-- note: use `data.eventObj` to access the details of the event -->
<h1>{data.eventBody.title}</h1>

<style>
	#title_frame {
		display: flex;
		justify-content: left;
		align-items: left;
		width: 100%;
	}
	#title {
		color: rgb(80, 0, 0);
		height: 60px;
		font-size: 48px;
		width: 100%;
		text-align: left;
	}
	#frame {
		background-color: #f8f8f8;
		overflow: auto;
		height: 100vh;
		width: 100%;
	}
	#text_frame {
		display: flex;
		justify-content: left;
		align-items: left;
	}
	#text {
		color: black;
		font-size: 16px;
		width: 60%;
		border-color: black;
		border-width: 2px;
		text-align: left;
	}
</style>
