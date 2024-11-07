<script>
    let counter = 0;
</script>
<h1 align='center'><button class='btn btn-primary' on:click={() => counter++}>Increase count</button></h1>
<span class="countdown font-mono text-6xl">
    <span style="--value:{counter};"></span>
</span>