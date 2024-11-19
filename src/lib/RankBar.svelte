<!-- Author: Ivey Wang -->

<script lang="ts">
	export let ettl: number; // score of Ettl house
	export let hobler: number; // score of Hobler house
	export let albemarle: number; // score of Albemarle house
	export let lambert: number; // score of Lambert house
</script>

<p><progress class="progress progress-success w-56" value={ettl} max="1000"></progress></p>
<p><progress class="progress progress-error w-56" value={hobler} max="1000"></progress></p>
<p><progress class="progress progress-warning w-56" value={albemarle} max="1000"></progress></p>
<p><progress class="progress progress-info w-56" value={lambert} max="1000"></progress></p>
<p><progress id="id1" class="progress w-56" value="70" max="100"></progress></p>

<style>
	#id1 {
		background: #ffff97;
	}
	.progress {
		position: relative;
		width: 80%;
		left: 10%;
		appearance: none;
		overflow: hidden;
		height: 2.5rem /* 8px */;
		border-radius: var(--rounded-box, 1rem /* 16px */);
		background-color: var(--fallback-bc, oklch(var(--bc) / 0.1));
	}
	.progress-success::-moz-progress-bar {
		border-radius: var(--rounded-box, 1rem /* 16px */);
		--tw-bg-opacity: 1;
		background-color: var(--fallback-su, oklch(var(--su) / var(--tw-bg-opacity)));
	}
	.progress-success:indeterminate {
		--progress-color: var(--fallback-su, oklch(var(--su) / 1));
	}
	.progress-success::-webkit-progress-value {
		--tw-bg-opacity: 1;
		background-color: var(--fallback-su, oklch(var(--su) / var(--tw-bg-opacity)));
	}
</style>
