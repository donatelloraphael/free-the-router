<template>
	<div class="container">
		<div class="bg-left"></div>
		
		<div class="body">

			<div class="firmware" id="openwrt">
				<div class="content">
					<h1><a href="https://openwrt.org/">OpenWrt</a></h1>
					<p><a href="https://openwrt.org/toh/start">Table of the devices</a> supported by OpenWrt.</p>
					<p><a href="https://openwrt.org/_media/toh_dump_tab_separated_csv.zip">CSV dump of the OpenWrt hardware database, updated daily.</a></p>
					<p>You can import it in LibreOffice Calc, MS Excel or other programs to visualize the data.</p>
				</div>
				<a href="https://openwrt.org/"><img src="@/assets/images/firmwares/openwrt.png" alt="OpenWrt logo"></a>
			</div>
			
      <hr class="dotted-divider">

			<div class="firmware" id="ddwrt">
				<div class="content">
					<h1><a href="https://dd-wrt.com/">DD-WRT</a></h1>
					<p>Search for router here at <a href="https://dd-wrt.com/support/router-database/">DD-WRT router database.</a></p>
					<p><a href="https://dd-wrt.com/wiki/index.php/Supported_Devices">Supported devices list</a> at the DD-WRT wiki.</p>
					<p>Known <a href="https://wiki.dd-wrt.com/wiki/index.php/Known_incompatible_devices">incompatable devices.</a></p>
				</div>
				<a href="https://dd-wrt.com/"><img src="@/assets/images/firmwares/ddwrt.png" alt="DD-WRT logo"></a>	
			</div>

      <hr class="dotted-divider">

			<div class="firmware" id="gargoyle">
				<div class="content">
					<h1><a href="https://www.gargoyle-router.com/index.php">Gargoyle</a></h1>	
					<p><a href="https://www.gargoyle-router.com/wiki/doku.php?id=supported_routers_-_tested_routers">List of routers</a> tested and verified to work with Gargoyle.</p>
					<p>If the router is not on the above list, search on the <a href="http://www.gargoyle-router.com/phpbb/index.php">Gargoyle forums</a> for posts relating to the make and model of the router.</p>
					<p>Since Gargoyle is built on OpenWrt, it is likely that the <a href="https://openwrt.org/toh/start">routers supported by OpenWrt</a> also support Gargoyle, but there is no guarantee!</p>
				</div>
				<a href="https://www.gargoyle-router.com/index.php"><img src="@/assets/images/firmwares/gargoyle.png" alt="Gargoyle logo"></a>
			</div>
      
      <hr class="dotted-divider">
			
			<div class="firmware" id="advancedtomato">
				<div class="content">
					<h1><a href="https://advancedtomato.com">AdvancedTomato</a></h1>
					<p>The hardware list of supported devices by Advanced tomato is <a href="https://advancedtomato.com/downloads">available on their site.</a></p>
				</div>
				<a href="https://advancedtomato.com/"><img src="@/assets/images/firmwares/advancedtomato.png" alt="Advanced Tomato logo"></a>
			</div>

      <hr class="dotted-divider">

			<div class="firmware" id="freshtomato">
				<div class="content">
					<h1><a href="https://exotic.se/freshtomato/">FreshTomato</a></h1>
					<p>There is a simple to read list of devices supported by FreshTomato on <a href="https://en.wikipedia.org/wiki/Tomato_(firmware)">Wikipedia article about Tomato firmware.</a></p>
					<p><a href="https://exotic.se/freshtomato-arm/">The list of devices</a> having processors with ARM architecture on FreshTomato site.</p>
					<p><a href="https://exotic.se/freshtomato-mips/">The list of devices</a> having processors with MIPS architecture on FreshTomato site.</p>
				</div>
				<a href="https://exotic.se/freshtomato/"><img src="@/assets/images/firmwares/freshtomato.png" alt="Fresh Tomato logo"></a>
			</div>

      <hr class="dotted-divider">

			<div class="firmware" id="tomatobyshibby">
				<div class="content">
					<h1><a href="https://tomato.groov.pl/">Tomato by Shibby</a></h1>
					<p>The list of supported devices on the <a href="https://tomato.groov.pl/?page_id=69">Tomato by Shibby site.</a></p>
				</div>
				<a href="https://tomato.groov.pl/"><img src="@/assets/images/firmwares/tomatobyshibby.png" alt="Tomato by Shibby logo"></a>
			</div>

      <hr class="dotted-divider">

      <div class="firmware" id="asuswrt-merlin">
				<div class="content">
					<h1><a href="https://www.asuswrt-merlin.net/">Asuswrt-Merlin</a></h1>
					<p>The list of supported devices on the <a href="https://www.asuswrt-merlin.net/about">Asuswrt-Merlin site.</a></p>
				</div>
				<a href="https://www.asuswrt-merlin.net/"><img src="@/assets/images/firmwares/asuswrt-merlin.png" alt="Asuswrt-Merlin logo"></a>
			</div>

      <hr class="dotted-divider">

		</div>

		<div class="bg-right"></div>
		
	</div>
</template>

<script>
	export default {
		head: {
	    title: "Compatable Devices - Free The Router",
	    meta: [
	      { hid: 'description', name: 'description', content: 'Find devices supported by each custom firmware projects' }
	    ]
	  }
	}
</script>

<style scoped>
	.container {
		margin: 0 auto;
		width: 100%;
	  min-height: 100vh;
	  text-align: center;
	  display: grid;
	  grid-template-areas: "bg-left body body body body body body bg-right";
	}

	.body {
		padding-top: 10rem;
		height: 100%;
		width: 100%;
		grid-area: body;
	}

	.bg-left {
		grid-area: bg-left;
    background-color: #2e3192;
    padding: 8rem 0 0 0;
    height: 100%;
    width: 150px;
    -webkit-box-shadow: 0px 0px 5px 2px rgba(120,120,120,1);
		-moz-box-shadow: 0px 0px 5px 2px rgba(120,120,120,1);
		box-shadow: 0px 0px 5px 2px rgba(120,120,120,1);
	}

	.bg-right {
		grid-area: bg-right;
    background-color: #2e3192;
    height: 100%;
    width: 150px;
    padding: 8rem 0 0 0;
    float: right;
    -webkit-box-shadow: 0px 0px 5px 2px rgba(120,120,120,1);
		-moz-box-shadow: 0px 0px 5px 2px rgba(120,120,120,1);
		box-shadow: 0px 0px 5px 2px rgba(120,120,120,1);
	}
	
	.firmware {
		padding: 20px;
		text-align: center;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.content {
		width: 60%;
		padding: 0 20px;
	}

	h1 a {
		text-decoration: none;
		color: black;
	}

	p {
		width: 100%;
		margin: 20px auto;
	}

	p a {
		text-decoration: none;
		color: #2e3192;
		font-weight: bold;
	}

	img {
		display: inline-block;
		float: right;
		width: 300px;
	}

	/***************MEDIA QUERIES*******************/
	@media (max-width: 1200px) {
		.bg-left, .bg-right {
			width: 50px;
		}
	}

	@media (max-width: 789px) {
		.bg-left, .bg-right {
			display: none;
		}

		.content {
			width: 100%;
		}
	}

</style>