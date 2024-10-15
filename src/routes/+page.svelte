<script>
	import logo from '$lib/assets/114514.jpeg';
	var yeshouxianbei = 114514;
	function increment() {
		yeshouxianbei += 1;
	}
</script>

<h1>1919810</h1>
<button on:click={increment}>
	We love {yeshouxianbei}!
	<img src={logo} alt="" />
</button>
.

<style>
	h1 {
		color: yellow;
		font-family: cursive;
		font-size: 4em;
	}
	button {
		color: blue;
		font-family: cursive;
		font-size: 2em;
	}
	button:hover {
		color: red;
	}
</style>
