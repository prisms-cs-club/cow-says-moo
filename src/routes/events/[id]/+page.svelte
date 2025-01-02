<script lang="ts">
	import { onMount } from 'svelte';
	import RankBar from '$lib/RankBar.svelte';
	export let data;

	onMount(async () => {});
</script>

<div id="frame">
	<div id="title_frame">
		<h1 id="title">{data.event.title}</h1>
	</div>
	<div id="text_frame">
		<p id="text">{data.event.description}</p>
	</div>
	<div id="leaderboard">
		<!-- TODO urgent: set up API to query the score each house get in each event -->
		<RankBar />
	</div>
</div>

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
		border-top-width: 2px;
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
