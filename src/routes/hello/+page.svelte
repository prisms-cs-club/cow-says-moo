<script>
	import { text } from '@sveltejs/kit';
	var num1 = 0,
		num2 = 0;

	function onclick1() {
		num1++;
	}
	function onclick2() {
		num2++;
	}
</script>

<!-- center aligned -->
<h1 class="text-center">Hi Tom</h1>

<p>This is a paragraph</p>
<p>This is a paragraph with <strong>bold</strong> and <em>italic</em> text</p>

<p>{num1}</p>
<button class="btn" on:click={onclick1}>Increase 1</button>

<p>{num2}</p>
<button class="btn" on:click={onclick2}>Increase 2</button>
