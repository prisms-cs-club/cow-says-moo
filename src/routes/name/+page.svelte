<script>
	import Counter from "$lib/Counter.svelte";
    
    export let data 
</script>

<h1 align="center"><b>Hello {data.name}!</b></h1>
<h2 align="center">This is a paragraph.</h2>
<h2 align="center">This is a paragraph with <b>bold</b> and <i>italic</i> texts.</h2>
<h2 align="center"><Counter /></h2>

<style>
    h1 {
        font-size: 50px;
    }


</style>
