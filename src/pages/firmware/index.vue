<template>
	<div class="container">
		
		<div class="bg-left"></div>

		<div class="body" id="openwrt">
			<div class="firmware">
				<div class="col-left">
					<a href="https://www.openwrt.org/">
						<!-- <h2>OpenWrt</h2> -->
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

      <hr class="dotted-divider" id="ddwrt-">

			<div class="firmware">
				<div class="col-left">
					<a href="https://dd-wrt.com">
						<!-- <h2>DD-WRT</h2> -->
						<img src="@/assets/images/firmwares/ddwrt.png" alt="DD-Wrt logo">
					</a>
					<p>
						<a href="https://en.wikipedia.org/wiki/DD-WRT">DD-WRT</a> is a Linux based Open Source firmware for routers, access points, and embedded systems. DD-WRT is a popular and stable custom firmware available with support for many devices. It was created by Sebastian Gottschall, the primary maintainer of DD-WRT project, in 2005. DD-WRT provides out of the box easy management of the router by a simple web interface. DD-WRT is freely available for private use cases while platforms used for commercial purposes require a paid license. Being an open source project that is actively maintained, DD-WRT like most of the custom firmwares featured here, fixes security flaws quickly as they are discovered.
					</p>
					<p>
						Some of the features supported by DD-WRT are Access control, Bandwidth monitoring, File sharing, Quality of Service (QoS), Wireless access point configuration, overclocking, enhanced frequencies, VPN integration, Dynamic DNS, ability to link routers, Wake-on-LAN, etc. Overall, DD-WRT is a solid choice as a custom firmware that require little set up to use. 
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

      <hr class="dotted-divider" id="gargoyle-">

      <div class="firmware">
				<div class="col-left">
					<a href="https://www.gargoyle-router.com/">
						<!-- <h2>Gargoyle</h2> -->
						<img src="@/assets/images/firmwares/gargoyle.png" alt="Gargoyle logo">
					</a>
					<p>
						<a href="https://en.wikipedia.org/wiki/Gargoyle_(router_firmware)">Gargoyle</a> is an OpenWrt based Linux distribution for routers and access points. Gargoyle is mainly meant for routers with Atheros or Broadcom chipsets. Some models of Asus, Netgear, Linksys and TP-Link routers are also supported. Gargoyle project is Open Source and was started in 2008 by Eric Bishop. Gargoyle firmware aims to extend the functionality of supported routers far beyond what the stock factory firmware provides.
					</p>
					<p>
						Some of the features supported by Gargoyle are Network are Network File Sharing, advanced Bandwidth Monitoring and quotas, VPN server and client, Bandwidth Throttling, blocking forbidden websites, using as a Wireless Bridge, Quality of Service (QoS) with active congestion control, advertisement blocking, and wifi scheduling.
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

      <hr class="dotted-divider" id="advancedtomato-">

			<div class="firmware">
				<div class="col-left">
					<a href="https://advancedtomato.com/">
						<!-- <h2>AdvancedTomato</h2> -->
						<img src="@/assets/images/firmwares/advancedtomato.png" alt="Advanced Tomato logo">
					</a>
					<p>
						<a href="https://advancedtomato.com/">AdvancedTomato</a> is an Open Source Linux distribution for routers and access points based on Tomato by Shibby. AdvancedTomato is mainly meant for routers with Broadcom chipsets. As AdvancedTomato is a fork of Tomato by Shibby, it doesn't offer any functionalities that is not provided by Tomato by Shibby. But the different lies in the Graphical User Interface as AdvancedTomato employs a GUI design that is clean and contemporary flat design unlike the dated design of GUI of Tomato by Shibby.
					</p>
					<p>
						Unfortunately, despite the fact that AdvancedTomato is a fork of Tomato by Shibby, due to difference in web handler, it cannot be directly installed on to any router that supports Tomato by Shibby. Also, the releases of new versions of the firmware is dependent on the release of new versions of Tomato by Shibby. Since there has been no new version of the former in last 2 years, current AdvancedTomato releases also lags by that much.
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

			<hr class="dotted-divider" id="freshtomato-">

			<div class="firmware">
				<div class="col-left">
					<a href="https://exotic.se/freshtomato/">
						<!-- <h2>FreshTomato</h2> -->
						<img src="@/assets/images/firmwares/freshtomato.png" alt="Fresh Tomato logo">
					</a>
					<p>
						<a href="https://en.wikipedia.org/wiki/Tomato_(firmware)">FreshTomato</a> is an alternative open source firmware for Broadcom-based routers. FreshTomato is a fork of the original Tomato firmware for routers. Tomato project fragmented in to different forks over the years. FreshTomato is a fork that is still under active development and features have been added to it over the other forks of Tomato. 
					</p>
					<p>
						The features provided by FreshTomato includes but not limited to, an easy Graphical User Interface, Personal Web Server, Quality of Service(QoS), advanced bandwidth monitoring and Quotas, customizable firewall, Dynamic DNS, FileSharing by SMB, USB support to create devices such as printer, DLNA Server, VPN Service, Bittorrent client, Overclocking, etc.
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

			<hr class="dotted-divider" id="tomatobyshibby-">

			<div class="firmware">
				<div class="col-left">
					<a href="https://tomato.groov.pl/">
						<!-- <h2>FreshTomato</h2> -->
						<img src="@/assets/images/firmwares/tomatobyshibby.png" alt="Tomato by Shibby logo">
					</a>
					<p>
						<a href="https://en.wikipedia.org/wiki/Tomato_(firmware)">Tomato by Shibby</a> is an Open Source firmware for routers and access points based on Linux. The firmware is fork of the original Toamto by Jonathan Zarate. The firmware provides many of the features provided by other Tomato forks and a few extra features.
					</p>
					<p>
						The extra features provided by Tomato by Shibby includes Torrent client integration, NFS server integration, DNScrypt-proxy integration, Support for USB 3G modems, IPTraffic Monitor, configurable Quality of Service (QoS), built-in FTP and SAMBA servers, OpenVPN Server and client, support for mass storage memory and different file systems, Torrent client integration (Transmission) with user-friendly GUI for configuration, and many more. Unfortunately, Tomato by Shibby is not under active development as no new versions have been released in the last 2 years.
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

			<hr class="dotted-divider" id="asuswrt-merlin">

			<div class="firmware">
				<div class="col-left">
					<a href="https://www.asuswrt-merlin.net/">
						<!-- <h2>FreshTomato</h2> -->
						<img src="@/assets/images/firmwares/asuswrt-merlin.png" alt="Asuswrt-Merlin logo">
					</a>
					<p>
						<a href="https://www.asuswrt-merlin.net/about">Asuswrt-Merlin</a> is an alternative firmware for recent Asus routers. It is based on the Asuswrt firmware recent Asus routers ship with, which is originally based on Tomato.
					</p>
					<p>
						According to the <a href="https://github.com/RMerl/asuswrt-merlin.ng/wiki/About-Asuswrt">Home site of the project,</a>
						<blockquote cite="https://github.com/RMerl/asuswrt-merlin.ng/wiki/About-Asuswrt">"The goal of this project is to fix issues and bring some minor functionality adjustments to the original Asus firmware. While some features do get added, this is not the main focus of this project.
						It is not meant to replace existing projects such as Tomato or DD-WRT, but rather to offer an alternative for people who prefer the original firmware featureset."
						</blockquote>
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

			<hr class="dotted-divider" id="asuswrt-merlin">

		</div>
		<div class="bg-right"></div>
	</div>
	
</template>

<script>
	const TIMEOUT = 1;

	export default {
		//////////////Workaround for proper scrolling to hash links from other pages////////////////////		
		mounted () {
	    // From testing, without a brief timeout, it won't work.
	    if (this.$route.hash) {
	      setTimeout(() => this.scrollTo(this.$route.hash), TIMEOUT)
	    }
	  },
	  methods: {
	    scrollTo: function (hashtag) {
	      setTimeout(() => { location.href = hashtag }, TIMEOUT)
	    }
	  }
	};
</script>

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
    -webkit-box-shadow: 0px 0px 5px 2px rgba(120,120,120,1);
		-moz-box-shadow: 0px 0px 5px 2px rgba(120,120,120,1);
		box-shadow: 0px 0px 5px 2px rgba(120,120,120,1);
	}

	.bg-right {
    grid-area: bg-right;
    background-color: #2e3192;
    width: 150px;
    height: 100%;
    padding: 8rem 0 0 0;
    float: right;
    -webkit-box-shadow: 0px 0px 5px 2px rgba(120,120,120,1);
		-moz-box-shadow: 0px 0px 5px 2px rgba(120,120,120,1);
		box-shadow: 0px 0px 5px 2px rgba(120,120,120,1);
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
  	font-family: "Montserrat", sans-serif;
  	font-size: 1rem;
  	line-height: 2;
  	text-align: left;
  	margin-bottom: 20px;
  }

  .devices {
  	background-color: #2e3192;
  	font-family: "Montserrat", sans-serif;
  	font-size: 1.8rem;
  	color: white;
  	padding: 20px 10px;
  	margin: 20px;
  	border-radius: 20px;
  }

  .devices:hover {
  	color: yellow;
  }

  blockquote {
  	line-height: 1.8;
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

		.devices {
			padding: 30px;
		}
  }

</style>