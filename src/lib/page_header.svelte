<script>
	import menu_icon_1 from '../assets/menu_icon_1.png';
	import menu_icon_2 from '../assets/menu_icon_2.png';
	var navbar_menu_icon = menu_icon_1;
	function changeMenuIconEnter() {
		navbar_menu_icon = menu_icon_2;
	}
	function changeMenuIconLeave() {
		navbar_menu_icon = menu_icon_1;
	}
	function navbarBtn1Onclick() {
		window.location.href = '/';
	}
	function navbarBtn2Onclick() {
		window.location.href = '/events';
	}
	function navbarBtn3Onclick() {}
	function navbarBtn4Onclick() {}
	function navbarBtn5Onclick() {}
</script>

<div id="navbar_container">
	<button
		on:mouseenter={changeMenuIconEnter}
		on:mouseleave={changeMenuIconLeave}
		id="navbar_menu"
	>
		<img src={navbar_menu_icon} alt="Menu Icon" />
	</button>
	<div id="navbar_btns_div">
		<div>
			<button id="navbar_btn" on:click={navbarBtn1Onclick}> Home </button>
			<button id="navbar_btn" on:click={navbarBtn2Onclick}> Events </button>
			<button id="navbar_btn" on:click={navbarBtn3Onclick}> NAVBAR_BTN_3 </button>
			<button id="navbar_btn" on:click={navbarBtn4Onclick}> NAVBAR_BTN_4 </button>
			<button id="navbar_btn" on:click={navbarBtn5Onclick}> NAVBAR_BTN_5 </button>
		</div>
	</div>
</div>

<style>
	#navbar_menu {
		border: 0;
		height: 60px;
		width: 120px;
		position: absolute;
		top: 0;
		left: 0;
	}
	#navbar_container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
	h1 {
		background-color: white;
		color: white;
		height: 60px;
	}
	#navbar_btns_div {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	#navbar_btn {
		background-color: white;
		border: 0;
		height: 60px;
		width: 120px;
		color: black;
	}
	#navbar_btn:hover {
		background-color: rgb(80, 0, 0);
		color: white;
	}
</style>
