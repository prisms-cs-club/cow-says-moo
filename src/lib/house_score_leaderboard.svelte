<script>
	export let Alb_score;
	export let Etl_score;
	export let Lbt_score;
	export let Hbl_score;
	export let max_score;
</script>

<div class="leaderboard">
	<progress id="Albermarle" value={Alb_score} max={max_score}> </progress>
	<progress id="Ettl" value={Etl_score} max={max_score}> </progress>
	<progress id="Lambert" value={Lbt_score} max={max_score}> </progress>
	<progress id="Hobler" value={Hbl_score} max={max_score}> </progress>
</div>

<style>
	.leaderboard {
		position: fixed;
		background-color: transparent;
		overflow-y: auto;
		right: 0;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
	#Albermarle {
		background: yellow;
	}
	#Ettl {
		color: green;
	}
	#Lambert {
		color: blue;
	}
	#Hobler {
		color: red;
	}
</style>
