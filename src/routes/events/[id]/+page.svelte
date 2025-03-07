<script lang="ts">
	import { onMount } from 'svelte';
	import RankBar from '$lib/RankBar.svelte';
	import type { DataType } from './+page';
	import { formatDate, numberToRoman } from '$lib/utils';
	const { data }: { data: DataType } = $props();

	onMount(async () => {});
</script>

<div id="frame">
	<div id="title_frame">
		<h1 id="title">{data.event.title}</h1>
	</div>
	<p>{formatDate(data.event)}, Tier {numberToRoman(data.event.tier)}</p>
	<p id="text">{data.event.description}</p>
	{#if data.event.result &&
		data.event.result.albemarle &&
		data.event.result.lambert &&
		data.event.result.hobler &&
		data.event.result.ettl}
		<div id="leaderboard">
			<RankBar
				albemarle={data.event.result.albemarle}
				lambert={data.event.result.lambert}
				hobler={data.event.result.hobler}
				ettl={data.event.result.ettl} />
		</div>
	{:else}
		<p>There's no results for this event yet.</p>
	{/if}
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
		height: 100vh;
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
