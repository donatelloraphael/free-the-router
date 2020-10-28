<template>
	<div class="container">
		<h2>{{ $store.getters.getCountryFullName }}</h2>

		<div class="bg-left"></div>
		
		<div class="body">
			<div class="header">
				<app-breadcrumb :category="localCategory" :brand="device.company" :name="device.company + ' ' + device.model" :queryCategory="queryCategory"></app-breadcrumb>
			</div>

			<div class="content">
				<div class="images">
					<img class="main-img" :src="device.amazonThumbnail" alt="device main image">
				</div>
				<div class="details">
					<h1 class="title">{{ device.amazonName }}</h1>

					<p><span class="label">Model: </span><strong>{{device.company + ' ' + device.model}}</strong><span id="brand"><span class="label">Brand: </span><nuxt-link :to="{ path: '/shop', query: { brand: device.brand.toLowerCase() } }"><strong>{{device.company}}</strong></nuxt-link></span></p>

					<p><span class="label">RAM: <strong>{{device.RAM}} MB</strong></span><span class="label">Flash: <strong>{{device.Flash}} MB</strong></span></p>

					<p><span class="type">Device Type: <strong>{{deviceType}}</strong></span></p>

					<p class="firmwares">
						<span class="label">Supported Firmwares: </span>
						<nuxt-link :to="{ path: '/shop', query: {firmware: 'openwrt'}}"><span class="firmware" v-if="device.openwrtSupport">OpenWrt</span></nuxt-link>
						<nuxt-link :to="{ path: '/shop', query: {firmware: 'ddwrt'}}"><span class="firmware" v-if="device.ddwrtSupport">DD-Wrt</span></nuxt-link>
						<nuxt-link :to="{ path: '/shop', query: {firmware: 'asusmerlin'}}"><span class="firmware" v-if="device.asusMerlinSupport">AsusWrt-Merlin</span></nuxt-link>
						<nuxt-link :to="{ path: '/shop', query: {firmware: 'freshtomato'}}"><span class="firmware" v-if="device.freshtomatoSupport">FreshTomato</span></nuxt-link>
						<nuxt-link :to="{ path: '/shop', query: {firmware: 'gargoyle'}}"><span class="firmware" v-if="device.gargoyleSupport">Gargoyle</span></nuxt-link>
						<nuxt-link :to="{ path: '/shop', query: {firmware: 'advancedtomato'}}"><span class="firmware" v-if="device.advancedtomatoSupport">Advanced Tomato</span></nuxt-link>
						<nuxt-link :to="{ path: '/shop', query: {firmware: 'tomatobyshibby'}}"><span class="firmware" v-if="device.tomatobyshibbySupport">Tomato by Shibby</span></nuxt-link>
					</p>

					<div class="supported-versions">
						<p v-if="device.openwrtSupport"><span class="label">OpenWrt supported versions: </span><strong>{{ device.openwrtSupportedVersions.join(", ") }}</strong></p>
						<p v-if="device.ddwrtSupport"><span class="label">DD-Wrt supported versions: </span><strong>{{ device.ddwrtSupportedVersions.join(", ") }}</strong></p>
						<p v-if="device.freshtomatoSupport"><span class="label">FreshTomato supported versions: </span><strong>{{ device.freshtomatoSupportedVersions.join(", ") }}</strong></p>
						<p v-if="device.asusMerlinSupport"><span class="label">AsusWrt-Merlin supported versions: </span><strong>{{ device.asusMerlinSupportedVersions.join(", ") }}</strong></p>
						<p v-if="device.gargoyleSupport"><span class="label">Gargoyle supported versions: </span><strong>{{ device.gargoyleSupportedVersions.join(", ") }}</strong></p>
						<p v-if="device.advancedtomatoSupport"><span class="label">AdvancedTomato supported versions: </span><strong>{{ device.advancedtomatoSupportedVersions.join(", ") }}</strong></p>
						<p v-if="device.tomatobyshibbySupport"><span class="label">Tomato by Shibby supported versions: </span><strong>{{ device.tomatobyshibbySupportedVersions.join(", ") }}</strong></p>
					</div>

					<hr class="divider">

					<p><span class="label">Price: </span> <span class="price">{{ $store.getters.getCurrency }} {{device.amazonPrice.toLocaleString()}}*</span><span id="at">  @ </span><img src="~/assets/images/amazon/amazon.png" class="seller" alt="Amazon logo" @click="toSellerHome()"><span class="price-info" @click="amazonDisclaimer = true">*As of {{device.amazonUpdatedOn}}</span></p>
					<div v-if="amazonDisclaimer" @click="amazonDisclaimer = false">
						<div class="amazonDisclaimer">Product prices and availability are accurate as of the date/time indicated and are subject to change. Any price and availability information displayed on Amazon at the time of purchase will apply to the purchase of this product.</div>
					</div>
					
					<div id="disclaimer" :class="{active : disclaimerActive}"><span>Check with the seller the exact version of the router being sold so that your chosen custom firmware supports it.</span>
						<button @click="redirect(); disclaimerActive = false;">I understand</button>
					</div>

					<div id="backdrop" @click="disclaimerActive = false" :class="{active: disclaimerActive}"></div>

					<button class="goto" @click="disclaimerOrGo()">GO TO {{ amazonName.toUpperCase() }}</button>

				</div>

				<div class="specs">
					<hr class="dotted-divider">
					<h3>Specifications</h3>
					<table role="table">
						<thead role="rowgroup">
							<tr role="row">
								<th role="columnheader">Version</th>
								<th role="columnheader">RAM</th>
								<th role="columnheader">Flash</th>
								<th role="columnheader">LAN</th>
								<th role="columnheader">WiFi</th>
								<th role="columnheader">USB</th>
								<th role="columnheader">SATA</th>
							</tr>
						</thead>
						<tbody role="rowgroup">
							<tr role="row" v-for="(version, index) in device.specs">
								<td role="cell">{{ index }}</td>
								<td role="cell">{{ convertRAM(version) }} MB</td>
								<td role="cell">{{ convertFlash(version) }} MB</td>
								<td role="cell">{{ convertLAN(device.LAN[index]) }}</td>
								<td role="cell">{{ device.WiFi }}</td>
								<td role="cell">{{ convertUSB(device.USB[index]) }}</td>
								<td role="cell">{{ device.SATA ? "Yes" : "-" }}</td>
							</tr>
						</tbody>
					</table>

					<div class="notes">
						<h3>Notes</h3>
						<p v-if="device.openwrtNotes">OpenWrt Notes: {{ device.openwrtNotes }}</p>
						<p v-if="device.ddwrtNotes">DD-Wrt Notes: {{ device.ddwrtNotes }}</p>
						<p v-if="device.freshtomatoNotes">FreshTomato Notes: {{ device.freshtomatoNotes }}</p>
						<p v-if="device.asusMerlinNotes">AsusWrt-Merlin Notes: {{ device.asusMerlinNotes }}</p>
						<p v-if="device.gargoyleNotes">Gargoyle Notes: {{ device.gargoyleNotes }}</p>
						<p v-if="device.advancedtomatoNotes">AdvancedTomato Notes: {{ device.advancedtomatoNotes }}</p>
						<p v-if="device.tomatobyshibbyNotes">Tomato by Shibby Notes: {{ device.tomatobyshibbyNotes }}</p>
						<p v-if="device.ddwrtActivationNeeded">DD-Wrt Activation needed to use DD-Wrt with this device.</p>
						<p v-if="device.openwrtTechData">OpenWrt Tech Data: <a :href="device.openwrtTechData" target="_blank">View Details</a></p>
						<p v-if="device.openwrtUnsupportedFunctions">OpenWrt unsupported features: {{ device.openwrtUnsupportedFunctions }}</p>
					</div>

					<div class="statement">Freetherouter.com is a participant in the Amazon Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon. Certain content that appears on this site comes from Amazon Seller Services Private Limited. This content is provided 'as is' and is subjected to change or removal at any time.</div>
				</div>
			</div>

      

		</div>

		<div class="bg-right"></div>
		
	</div>
</template>

<script>

import axios from 'axios';
import Breadcrumb from '~/components/Navigation/Breadcrumb';

import { HOST, PROTOCOL } from '~/app/env';

// axios.defaults.withCredentials = true;

export default {
	head() {
		return {
			title: this.device.amazonName,
	    meta: [
	      { hid: 'description', name: 'description', content: `Details and specifications for ${this.device.amazonName} available in ${this.$store.getters.getCountryFullName}` }
	    ]
		};
  },
	components: {
		appBreadcrumb: Breadcrumb
	},

	data() {
		return {
			localCategory: "All Devices",
			queryCategory: "all-devices",
			disclaimerShown: false,
			disclaimerActive: false,
			amazonDisclaimer: false
		};
	},

	computed: {
		deviceType() {
			return this.device.deviceType ? this.device.deviceType : "Router";
		},
		amazonName() {
			switch(this.$store.getters.getCountry) {
				case "in": return "amazon.in";
				case "gb": return "amazon.co.uk";
				case "ca": return "amazon.ca";
				case "fr": return "amazon.fr";
				case "de": return "amazon.de";
				case "mx": return "amazon.com.mx";
				default: return "amazon.com";
			}
		},
		amazonRef() {
			let ref;
			switch(this.$store.getters.getCountry) {
				case "in": ref = "/ref=as_li_ss_tl?ie=UTF8&linkCode=ll2&tag=freetherou051-21&language=en_IN";
									break;
				case "gb": ref = "/ref=as_li_ss_tl?dchild=1&sr=8-5&linkCode=ll1&tag=freetherout01-21&language=en_GB";
									break;
				case "ca": ref = "/ref=as_li_ss_tl?dchild=1&sr=8-3&linkCode=ll1&tag=freetherout0c-20&language=en_CA";
									break;
				case "fr": ref = "/ref=as_li_ss_tl?dchild=1&sr=8-3&linkCode=ll1&tag=freetherout08-21";
									break;
				case "de": ref = "/ref=as_li_ss_tl?dchild=1&sr=8-3&linkCode=ll1&tag=freetherout04-21";
									break;
				case "mx": ref = "";
									break;
				default: ref = "/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&linkCode=as2&tag=freetherouter-20&language=en_US";
			}
			return ref;
		}
	},

	methods: {
		convertRAM(version) {
			if (!version) {
				return "-";
			} else if (typeof version === 'object') {
				return version[0].match(/\d+/gm)? (version[0].match(/\d+/gm)[1] ? version[0].match(/\d+/gm)[1] : "-") : '-';
			} else {
				return version.match(/\d+/gm) ? (version.match(/\d+/gm)[1] ? version.match(/\d+/gm)[1] : '-') : "-";
			}
		},
		convertFlash(version) {
			if (!version) {
				return "-";
			} else if (typeof version === 'object') {
				return version[0].match(/\d+/gm)? (version[0].match(/\d+/gm)[0] ? version[0].match(/\d+/gm)[0] : "-") : '-';
			} else {
				return version.match(/\d+/gm) ? (version.match(/\d+/gm)[0] ? version.match(/\d+/gm)[0] : '-') : "-";
			}
		},
		convertLAN(version) {
			if (typeof version === 'object') {
				return version[0];
			} else {
				return version;
			}
		},
		convertUSB(version) {
			if (typeof version === 'object') {
				return version[0] ? "Yes" : "-";
			} else {
				return version ? "Yes" : "-";
			}
		},
		disclaimerOrGo() {
			if (!this.disclaimerShown) {
				this.disclaimerActive = true;
			} else {
				window.open(this.device.amazonLink + this.amazonRef);
			}
		},
		redirect() {
			localStorage.setItem("disclaimerTimer", new Date().getTime());
			window.open(this.device.amazonLink + this.amazonRef);
		},
		toSellerHome() {
			window.open("https://www." + this.amazonName + this.amazonRef);
		}
	},

	async asyncData(context) {
		let device = {};

		try {
			if (process.server) {
				device = (await axios.get(`http://127.0.0.1:9000/devices/${context.store.getters.getCountry}-device-details/${context.route.params.device.toUpperCase()}`)).data;
			} else {

				device = (await axios.get(`${PROTOCOL}://${HOST}/api/devices/${context.store.getters.getCountry}-device-details/${context.route.params.device.toUpperCase()}`)).data;
			}
		} catch (error) {
			console.log(error);
		}

		return {
			device
		};
	},

	mounted() {

		let localCategory = localStorage.getItem("localCategory");

		if (localCategory) {
			this.localCategory = localCategory;
			this.queryCategory = localStorage.getItem("queryCategory");

			localStorage.removeItem("localCategory");
			localStorage.removeItem("queryCategory");
		}

		let disclaimerTimer = parseInt(localStorage.getItem("disclaimerTimer"));

		if (disclaimerTimer) {
			if ((disclaimerTimer + 600 * 1000) > new Date().getTime()) {
				this.disclaimerShown = true;
			} else {
				localStorage.removeItem("disclaimerTimer");
			}
		}
	}
};
	
</script>

<style scoped>

	.container {
		margin: 0 auto;
		width: 100%;
	  min-height: 100vh;
	  display: flex;
	  justify-content: space-between;
	}

	.body {
		padding-top: 10rem;
		height: 100%;
		width: 100%;
		display: block;
	}

	.bg-left {
    background-color: #2e3192;
    padding: 8rem 0 0 0;
    min-height: 100vh;
    width: 185px;
    -webkit-box-shadow: 0px 0px 5px 2px rgba(120,120,120,1);
		-moz-box-shadow: 0px 0px 5px 2px rgba(120,120,120,1);
		box-shadow: 0px 0px 5px 2px rgba(120,120,120,1);
	}

	.bg-right {
    background-color: #2e3192;
    min-height: 100vh;
    width: 185px;
    padding: 8rem 0 0 0;
    float: right;
    -webkit-box-shadow: 0px 0px 5px 2px rgba(120,120,120,1);
		-moz-box-shadow: 0px 0px 5px 2px rgba(120,120,120,1);
		box-shadow: 0px 0px 5px 2px rgba(120,120,120,1);
	}

	h1 {
		font-size: 1.5rem;
		margin: 0 auto 30px;
		text-align: center;
		width: 100%;
		font-family: "Montserrat", sans-serif;
	}

	/*******************CONTENT****************/

	.content {
		display: flex;
		flex-wrap: wrap;
		align-items: top;
	}

	.images {
		display: inline-block;
		width: 45%;
		margin: 0 30px;
	}

	.images img.main-img {
		max-width: 100%;
		max-height: 480px;
	}

	.details {
		text-align: left;
		display: inline-block;
		margin-left: 50px;
		padding-top: 0;
		width: 40%;
		font-family: "Montserrat", sans-serif;
	}

	.details p {
		padding: 10px 0;
		font-size: 0.9rem;
		color: #6d6d6d;
	}

	.details strong {
		font-size: 1rem;
		font-weight: bold;
		color: black;
		margin-left: 10px;
		margin-right: 30px;
	}

	hr.divider {
		width: 100%;
		border-top: 1px solid black;
	}

	.price {
		font-size:1.5rem;
		color: brown;
		font-weight: bold;
	}

	.price-info {
		font-size: 0.8rem;
		cursor: pointer;
	}

	.price-info:hover {
		color: black;
	}

	#at {
		position: relative;
		bottom: 5px;
		margin-left: 5px;
	}

	img.seller {
		height: 30px;
		margin: 0 10px;
		position: relative;
		top: 7px;
	}

	img.seller:hover {
		cursor: pointer;
	}

	.amazonDisclaimer {
		font-size: 0.8rem;
		line-height: 1.5;
	}

	a, a:visited {
		text-decoration: none;
		color: black;
	}

	#disclaimer {
		position: fixed;
		top: 35vh;
		left: 30vw;
		width: 40vw;
		height: auto;
		background-color: #ce4c4c;
		display: none;
		z-index: 500;
		padding: 20px;
		line-height: 2;
		color: white;
		font-size: 1.2rem;
		font-weight: bold;
		border-radius: 10px;
	}

	#disclaimer button {
		background-color: #2e3192;
		margin-top: 30px;
		color: white;
		height: 3rem;
		font-size: 1.2rem;
		padding: 20px auto;
		border-radius: 10px;
	}

	#disclaimer.active, #backdrop.active {
		display: block;
	}

	#backdrop {
		position: fixed;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		background-color: rgba(0,0,0,0.4);
		display: none;
		z-index: 100;
	}

	.goto {
		padding: 20px 30px;
		background-color: orange;
		border: 1px solid black;
		text-align: center;
		margin: 20px 0;
		font-weight: bold;
		cursor: pointer;
		font-size: 1.2rem;
	}

	.goto:hover {
		background-color: #e5a419;
	}

	.details button {
		text-align: center;
		width: 100%;
	}

	.firmwares {
		display: flex;
		flex-wrap: wrap;
		height: auto;
		line-height: 2.5;
		position: relative;
		bottom: 5px;
	}

	.firmwares .label {
		display: inline-block;
		margin-right: 20px;
		padding: 0;
	}

	.firmware {
		padding: 5px 10px;
		margin: 3px;
		background-color: #42b983;
		/*background-color: brown;*/
		border-radius: 10px;
		color: white;
	}

	.supported-versions {
		position: relative;
		bottom: 10px;
	}

	/*******************SPECS************************/

	hr.dotted-divider {
		margin: 0 auto;
		width: 100%;
	}

	.specs {
		width: 90%;
		height: auto;
		margin: 30px auto;
		text-align: center;
	}

	h3 {
		margin: 30px;
		font-size: 1.4rem;
	}

	h2 {
		position: absolute;
		font-size: 5px;
	}

	table {
	  border: 2px solid #42b983;
	  border-radius: 3px;
	  background-color: #fff;
	  font-family: "Montserrat", sans-serif;
	  margin: auto auto 3rem;
	}

	th {
		/*background-color: brown;*/
	  background-color: #42b983;
	  /*background-color: #2e3192;*/
	  color: rgba(255,255,255,0.66);
	  color: white; 
	  font-weight: bold; 
	}

	td {
	  background-color: #f9f9f9;
	}

	th, td {
	  min-width: 80px;
	  width: 120px;
	  padding: 10px 20px;
	}

	tr:nth-of-type(odd) td { 
	  background: #eee; 
	}

	/****************NOTES************************/
	.notes {
		margin: 30px 0;
		text-align: left;
	}

	.notes p {
		margin: 2rem;
	}

	.notes p a {
		color: blue;
	}

	.statement {
		text-align: center;
		color: grey;
		font-size: 0.8rem;
	}

	/***************MEDIA QUERIES*******************/
	@media (max-width: 1200px) {
		.bg-left, .bg-right {
			width: 50px;
		}
	}

	@media (max-width: 1000px) {
		.images {
			text-align: center;
			margin: 20px auto;
			width: 40%;
		}

		#brand {
			margin: 20px 0 0 0;
			clear: left;
			width: 80%;
			display: block;
		} 

		#brand strong {
			margin-left: 10px;
		}

		.details button {
			text-align: center;
			width: 95%;
		}

		.price-info {
			display: block;
			clear: left;
			margin-top: 10px;
		}

		.specs {
			width: 98%;
		}
	}

	@media (max-width: 789px) {
		.bg-left, .bg-right {
			display: none;
		}

		.content {
			display: flex;
			justify-content: center;
		}

		h1 {
			margin: 20px 0;
		}

		.images {
			width: 80%;
			display: flex;		
			align-items: center;
		}

		.details {
			text-align: left;
			width: 90%;
			margin-left: 0;
			text-align: left;
		}

		a {
			text-align: center;
			margin: 0 auto;
		}

		#disclaimer {
			width: 90vw;
			left: 5vw;
		}
	}

	@media (max-width: 650px) {
		/****************TABLE******************/

		/* Force table to not be like tables anymore */
		table, thead, tbody, th, td, tr { 
			display: block;
			border: none;
		}

		/* Hide table headers (but not display: none;, for accessibility) */
		thead tr { 
			position: absolute;
			top: -9999px;
			left: -9999px;
		}

		td { 
			/* Behave  like a "row" */
			border: none;
			position: relative;
			padding: 5px auto 5px 50%;
			margin: 2px;
			min-height: 2.5rem;
			width: auto;
			color: black;
			border-radius: 30px;
		}

		td:before { 
			/* Now like a table header */
			position: absolute;
			/* Top/left values mimic padding */
			top: 10px;
			left: 6px;
			width: 45%;
			padding-right: 10px; 
			white-space: nowrap;
			font-weight: bold;
		}

		tr:nth-of-type(odd) td { 
			background-color: #eee;
		}

		tr:nth-of-type(even) td { 
			background-color: #ccc;
		}

		/* Label the data */
		td:nth-of-type(1):before { content: "Version"; }
		td:nth-of-type(2):before { content: "RAM"; }
		td:nth-of-type(3):before { content: "Flash"; }
		td:nth-of-type(4):before { content: "LAN"; }
		td:nth-of-type(5):before { content: "WiFi"; }
		td:nth-of-type(6):before { content: "USB"; }
		td:nth-of-type(7):before { content: "SATA"; }
	}

</style>