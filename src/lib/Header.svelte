<script>
	function navbarBtn1Onclick() {
		window.location.href = '/';
	}
	function navbarBtn2Onclick() {
		window.location.href = '/events';
	}
	function navbarBtn3Onclick() {
		window.location.href = '/ranking';
	}
	function navbarBtn4Onclick() {
		window.location.href = '/calendar';
	}
	function navbarBtn5Onclick() {}
</script>

<h1>
	<div id="navbar_container">
		<div id="navbar_btns_div">
			<div>
				<button id="navbar_btn" on:click={navbarBtn1Onclick}> Home </button>
				<button id="navbar_btn" on:click={navbarBtn2Onclick}> Events </button>
				<button id="navbar_btn" on:click={navbarBtn3Onclick}> Rankings </button>
				<button id="navbar_btn" on:click={navbarBtn4Onclick}> Calender </button>
				<button id="navbar_btn" on:click={navbarBtn5Onclick}> NAVBAR_BTN_5 </button>
			</div>
		</div>
	</div>
</h1>

<style>
	#navbar_container {
		display: flex;
		position: fixed; /* Change position to fixed */
		top: 0; /* Position it at the top */
		left: 0; /* Ensure it starts from the left edge */
		right: 0; /* Ensure it covers the full width */
		overflow: auto;
		justify-content: center;
		align-items: center;
		width: 100%;
		background-color: rgb(80, 0, 0); /* Give it a background color */
		z-index: 1000; /* Ensure it stays on top */
	}

	h1 {
		height: 60px;
		margin: 0; /* Remove margin */
		width: 100%; /* Ensure it covers the full width */
	}

	#navbar_btns_div {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	#navbar_btn {
		border: 0;
		height: 60px;
		width: 120px;
		color: white;
		cursor: pointer; /* Add a pointer cursor */
	}

	#navbar_btn:hover {
		background-color: black;
		color: white;
	}
</style>
