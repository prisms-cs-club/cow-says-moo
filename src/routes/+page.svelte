<script>
    import PRISMSLogo from '$lib/Images/PRISMS-logo.png'
</script>

<svelte:head>
	<title>PRISMS69</title>
	<meta name="Home" content="69" />
</svelte:head>

<section>
    
	<span>
		<img class = "logo" src={PRISMSLogo} alt="PRISMS Logo" />
        <h1 class = "intro">Welcome to Cows Says Moo</h1>
	</span>
</section>

<style>
    .logo {
        width: 100%;
        max-width: 64rem;
        margin: 0 auto;
        display: block;
    }
    .intro {
        text-align: center;
    }
    section {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
    span {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        width: 100%;
        max-width: 64rem;
        margin: 0 auto;
        box-sizing: border-box;
    }
</style>
