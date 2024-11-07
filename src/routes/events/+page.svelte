<script>
	import PageHeader from '$lib/page_header.svelte';
	let event_title = '114514';
	let event_text = '1145141919810, 114514, 1919810, 1145141919810.';
</script>

<h1>
	<PageHeader />
</h1>

<div id="frame">
	<div id="title_frame">
		<h1 id="title">{event_title}</h1>
	</div>
</div>

<style>
	#title_frame {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	#title {
		background-color: #f8f8f8;
		color: black;
		height: 60px;
		font-size: 48px;
	}
	#frame {
		background-color: #f0f0f0;
		overflow: auto;
		height: 100vh;
		width: 100%;
	}
</style>
