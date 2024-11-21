<!-- Author: Addison Steen -->

<div id="wrapper">
	<div class="parallax"></div>
	<div id="navbar">
		<ul>
			<li class="o"><a href="index.html">Home</a></li>
			<li class="o"><a href="index.html">House Rankings</a></li>
			<li class="o"><a href="index.html">Upcoming Events</a></li>
			<li class="o"><a href="index.html">Calendar</a></li>
			<li class="o"><a href="index.html">Activity Suggestions</a></li>
		</ul>
	</div>
</div>

<style>
	/*parallax extra credit*/
	.parallax {
		/*Image Source: cntraveler.com/hotels/thailand/ang-thong/four-seasons-resort-koh-samui*/
		/* background-image: url('bg.png'); */
		grid-column-start: 1;
		grid-column-end: 9;
		grid-row-start: 1;
		grid-row-end: 6;
		text-align: center;

		min-height: 1000px;
		min-width: 100px;

		background-attachment: fixed;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}

	#wrapper {
		display: grid;
		grid-gap: 5px;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-template-rows: auto auto auto;
	}

	/*Nav Bar*/

	#navbar ul {
		font-size: medium;
		font-family: Georgia;
		list-style-type: none;
		margin: 0px;
		padding: 10px;
		text-align: center;
		background-color: #a61618;
	}

	#navbar ul li {
		font-family: Georgia;
		display: inline;
	}

	#navbar li a {
		font-family: Georgia;
		text-decoration: none;
		padding: 10px;
		color: #FFFFFF;
		background-color: #a61618;
	}

	#navbar a:hover {
		font-family: Georgia;
		color: #a61618;
		background-color: #FFFFFF;
	}

	#navbar {
		font-family: Georgia;
		grid-column-start: 1;
		grid-column-end: 9;
		grid-row-start: 1;
		grid-row-end: 2;
	}

	.navbar {
		font-family: Georgia;
		overflow: hidden;
	}

	.navbar a {
		font-family: Georgia;
		float: left;
		font-size: 16px;
		color: #FFFFFF;
		text-align: center;
		padding: 14px 16px;
		text-decoration: none;
	}

	/*description*/
	#d {
		border: double;
		color: #FFFFFF;
		border-width: 4px;
		box-shadow: 5px 5px #FFFFFF;
		background-color: #a61618;
		grid-column-start: 1;
		grid-column-end: 5;
		grid-row-start: 3;
		grid-row-end: 4;
		text-align: left;
		margin-left: 10px;
		margin-right: 10px;
		padding: 10px;
	}

	/*image*/
</style>
