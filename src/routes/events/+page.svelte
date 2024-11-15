<script>
	import PageHeader from '$lib/page_header.svelte';
</script>

<h1>
	<div id="page_header" class="movetotop">
		<PageHeader />
	</div>
</h1>

<div id="frame">
	<div id="kickball_frame" class="event_frame">
		<a href="/events/kickball">go to kickball</a>
	</div>
</div>

<style>
	#frame {
		background-color: #f8f8f8;
		overflow: auto;
		height: 100vh;
		width: 100%;
	}
	#kickball_frame {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.event_frame {
		height: 320px;
		width: 60%;
	}
</style>
