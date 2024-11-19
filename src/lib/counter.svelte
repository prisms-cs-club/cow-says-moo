<script>
	export let logo;

	export let message;
	let counter = 0;
</script>

<p>{message}{counter}</p>

<button
	class="btn"
	on:click={() => {
		counter++;
        var audio = new Audio('src/buy.mp3');
		audio.play();
	}}>Buy {logo}</button
>
