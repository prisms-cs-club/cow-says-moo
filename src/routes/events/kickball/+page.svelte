<script>
	import PageHeader from '$lib/page_header.svelte';
	import HouseScoreLeaderboard from '$lib/house_score_leaderboard.svelte';
	let event_title = 'Kickball';
	let event_text =
		'Kickball (also known as soccer baseball in most of Canada and football rounders in the United Kingdom) is a team sport and league game, similar to baseball. Like baseball, it is a safe haven game in which one team tries to score by having its players return a ball from home base to the field and then circle the bases. Meanwhile, the other team tries to stop them by tagging them "out" with the ball before they can return to home base. However, instead of hitting a small, hard ball with a bat, players kick an inflated rubber ball; this makes it more accessible to young children. As in baseball, teams alternate half-innings. The team with the most runs after a predefined number of innings wins.';
</script>

<h1>
	<div id="page_header" class="movetotop">
		<PageHeader />
	</div>
</h1>

<div id="frame">
	<div id="title_frame">
		<h1 id="title">{event_title}</h1>
	</div>
	<div id="text_frame">
		<p id="text">{event_text}</p>
	</div>
	<div id="leaderboard">
		<HouseScoreLeaderboard
			Alb_score="11"
			Lbt_score="45"
			Hbl_score="14"
			Etl_score="19"
			max_score="98"
		/>
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
