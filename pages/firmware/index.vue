<template>
	<div class="container">
		
		<div class="bg-left"></div>

		<div class="body">
			<div class="openwrt firmware">
				<div class="col-left">
					<a href="https://www.openwrt.org/">
						<h2>OpenWrt</h2>
						<img src="@/assets/images/firmwares/openwrt.png" alt="OpenWrt logo">
					</a>
					<p>
						<a href="https://en.wikipedia.org/wiki/OpenWrt">OpenWrt</a> (<strong>OPEN W</strong>ireless <strong>R</strong>ou<strong>T</strong>er) is an Open Source firmware based on Linux for embedded devices. The OpenWrt project was started in 2004 as a firmware for Linksys WRT54G series of wireless routers. It is mainly used in home routers but it can be run on various devices such as gateways, smartphones, laptops, etc. Rather than trying to include every functionality with the base installation, OpenWrt uses a package management system that provides around 15,000 optional packages that provides various functionality. OpenWrt can be  configured using a command-line interface or a web interface (LuCI).
					</p>
					<p>
						The modular nature of OpenWrt allows you to customize your device through the use of packages to suit almost any application. Some of the available features include File Sharing, Quality of Service (QoS) support for prioritizing network traffic, torrent client, Dynamic DNS service, extensive network monitoring and statistics, audio streaming, ability to connect various devices such as web cams and printers, etc.
					</p>
					<p>
						OpenWrt provides the highest compatabilty with routers among custom firmwares available today. To use the complete features offered by OpenWrt, it is necessary to purchase a router having enough Flash memory and RAM. OpenWrt now recommends routers having 16MB Flash and 64MB RAM.
					</p>

				</div>
				<div class="col-right">
					<nuxt-link to="#">
						<div class="devices">
							View compatable devices
						</div>
					</nuxt-link>
				</div>
			</div>

      <hr class="dotted-divider">

		</div>
		<div class="bg-right"></div>
	</div>
	
</template>

<style scoped>

/*****************************TOP LAYOUT*******************************/

	.container {
	  margin: 0 auto;
	  min-height: 100vh;
	  text-align: center;
	  display: grid;
	  grid-template-areas: "bg-left body body body body body body bg-right";
	}

	.bg-left {
    grid-area: bg-left;
    background-color: #2e3192;
    width: 150px;
    padding: 8rem 0 0 0;
    height: 100%;
	}

	.bg-right {
    grid-area: bg-right;
    background-color: #2e3192;
    width: 150px;
    height: 100%;
    padding: 8rem 0 0 0;
    float: right;
  }

  .body {
    grid-area: body;
    /*background-color: green;*/
    padding: 8rem 0 0 0;
    
  }

/*********************************FIRMWARE LAYOUT**********************/
  .firmware {
		width: 90%;
		display: flex;
		justify-content: center;
		margin: 50px auto;
		/*background-color: yellow;*/
		flex-wrap: wrap;
  }
	
	.col-left {
		width: 65%;
		/*background-color: red;*/
		text-align: center
	}

  .col-right {
		width: 35%;
		/*background-color: green;*/
		display: flex;
		align-items: center;
		justify-content: center;
  }

  /***************************************FIRMWARE CONTENT*********************/
  h2 {
		font-size: 1.8rem;
		text-align: center;
		margin-bottom: 10px;
  }

  a {
  	text-decoration: none;
  	color: black;
  }

  p a {
  	font-weight: bold;
  	color: #2e3192;
  }

  .col-left img {
		width: 50%;
		text-align: center;
		margin: 0 20px 20px;
  }

  p {
  	font-family: "Montserrat", "Open Sans", sans-serif;
  	font-size: 1rem;
  	line-height: 2;
  	text-align: left;
  	margin-bottom: 20px;
  }

  .devices {
  	background-color: #2e3192;
  	font-family: "Montserrat", "Open Sans", sans-serif;
  	font-size: 1.8rem;
  	color: white;
  	padding: 10px;
  	margin: 20px;
  	border-radius: 20px;
  }

  .devices:hover {
  	color: yellow;
  }

	@media (max-width: 1200px) {
		.bg-left, .bg-right {
			width: 50px;
		}
	}

  @media (max-width: 910px) {
		.bg-left, .bg-right {
			display: none;
		}
  }

  @media (max-width: 789px) {
		.col-left {
			width: 100%;
		}

		.col-right  {
			width: 100%;
		}
  }

</style>