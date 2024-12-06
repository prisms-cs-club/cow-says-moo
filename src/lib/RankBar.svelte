<!-- Author: Ivey Wang -->

<script lang="ts">
	export let ettl: number; // score of Ettl house
	export let hobler: number; // score of Hobler house
	export let albemarle: number; // score of Albemarle house
	export let lambert: number; // score of Lambert house
	ettl = 300
	hobler = 200
	albemarle = 300
	lambert = 400
	let maxValue = Math.max(ettl,hobler,lambert,albemarle) * 1.1;
</script>
<title>House Ranking</title>
<p class = text>Ettl</p> <p><progress class="progress progress-ettl w-56" value={ettl} max={maxValue}></progress></p>
<p class = text>Hobler</p> <p><progress class="progress progress-hobler w-56" value={hobler} max={maxValue}></progress></p>
<p class = text>Albemarle</p> <p><progress class="progress progress-albemarle w-56" value={albemarle} max={maxValue}></progress></p>
<p class = text>Lambert</p> <p><progress class="progress progress-lambert w-56" value={lambert} max={maxValue}></progress></p>

<style>
	.text{
		top:70px;
		position: relative;
		left:5px;
	}
	.progress {
		position: relative;
		top: 50px;
		width: 80%;
		left:10%;
		appearance: none;
		overflow: hidden;
		height: 2rem /* 8px */;
		border-radius: var(--rounded-box, 1rem /* 16px */);
		background-color: var(--fallback-bc,oklch(var(--bc)/0.2));
	}
	.progress::-moz-progress-bar {
		border-radius: var(--rounded-box, 1rem /* 16px */);
		--tw-bg-opacity: 1;
		background-color: var(--fallback-bc,oklch(var(--bc)/var(--tw-bg-opacity)));
	}
	:root {
		--color-albemarle: #ede625;
		--color-ettl:#26be3a;
		--color-hobler:#fa4242;
		--color-lambert:#4270fa;
	}

	/* Four progress bar's color in different browsers*/
	/* Ettl progress bar in different browsers*/
	.progress-ettl::-moz-progress-bar {
		border-radius: var(--rounded-box, 1rem /* 16px */);
		--tw-bg-opacity: 1;
		background-color: var(--color-ettl);
	}
	.progress-ettl:indeterminate {
		--progress-color: var(--color-ettl);
	}
	.progress-ettl::-webkit-progress-value {
		--tw-bg-opacity: 1;
		background-color: var(--color-ettl);
	}
	/* Albemarle progress bar in different browsers*/
	.progress-albemarle::-moz-progress-bar {
		border-radius: var(--rounded-box, 1rem /* 16px */);
		--tw-bg-opacity: 1;
		background-color: var(--color-albemarle);
	}
	.progress-albemarle:indeterminate {
		--progress-color: var(--color-albemarle);
	}
	.progress-albemarle::-webkit-progress-value {
		--tw-bg-opacity: 1;
		background-color: var(--color-albemarle);
	}
	/* Lambert progress bar in different browsers*/
	.progress-lambert::-moz-progress-bar {
		border-radius: var(--rounded-box, 1rem /* 16px */);
		--tw-bg-opacity: 1;
		background-color: var(--color-lambert);
	}
	.progress-lambert:indeterminate {
		--progress-color: var(--color-lambert);
	}
	.progress-lambert::-webkit-progress-value {
		--tw-bg-opacity: 1;
		background-color: var(--color-lambert);
	}
	/* Hobler progress bar in different browsers*/
	.progress-hobler::-moz-progress-bar {
		border-radius: var(--rounded-box, 1rem /* 16px */);
		--tw-bg-opacity: 1;
		background-color: var(--color-hobler);
	}
	.progress-hobler:indeterminate {
		--progress-color: var(--color-hobler);
	}
	.progress-hobler::-webkit-progress-value {
		--tw-bg-opacity: 1;
		background-color: var(--color-hobler);
	}
</style>