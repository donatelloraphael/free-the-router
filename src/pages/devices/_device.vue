<template>
	<div class="container">
		<div class="bg-left"></div>
		
		<div class="body">
			<div class="header">
				<app-breadcrumb :category="localCategory" :brand="device.company" :name="device.company + ' ' + device.model" :queryCategory="queryCategory"></app-breadcrumb>
			</div>

			<div class="content">
				<div class="images">
					<img class="main-img" :src="device.thumbnail" alt="device main image">
				</div>
				<div class="details">
					<h1 class="title">{{ device.name }}</h1>

					<p><span class="label">Model: </span><strong>{{device.company + ' ' + device.model}}</strong><span id="brand"><span class="label">Brand: </span><nuxt-link :to="{ path: '/shop', query: { brand: device.brand.toLowerCase() } }"><strong>{{device.company}}</strong></nuxt-link></span></p>

					<p><span class="label">RAM: <strong>{{device.RAM}} MB</strong></span><span class="label">Flash: <strong>{{device.Flash}} MB</strong></span></p>

					<p class="firmwares">
						<span class="label">Supported Firmwares: </span>
						<span class="firmware" v-if="device.openwrtSupport">OpenWrt</span>
						<span class="firmware" v-if="device.ddwrtSupport">DD-Wrt</span>
						<span class="firmware" v-if="device.asusMerlinSupport">AsusWrt-Merlin</span>
						<span class="firmware" v-if="device.freshtomatoSupport">FreshTomato</span>
						<span class="firmware" v-if="device.gargoyleSupport">Gargoyle</span>
						<span class="firmware" v-if="device.advancedtomatoSupport">Advanced Tomato</span>
						<span class="firmware" v-if="device.tomatobyshibbySupport">Tomato by Shibby</span>
					</p>

					<hr/>

					<p><span class="label">Price: </span>Rs. <span class="price">{{device.price.toLocaleString()}}*</span><span id="at">  @ </span> <a href="#" class="seller"><img src="~/assets/images/amazon/amazon-in.png" alt="Amazon logo"></a><span class="price-info">*As of {{device.updatedOn}}</span></p>

					<a class="button" href="#"><button class="goto">GO TO AMAZON.IN</button></a>
				</div>
			</div>

      

		</div>

		<div class="bg-right"></div>
		
	</div>
</template>

<script>

import { db } from '~/plugins/firebase.js';
import Breadcrumb from '~/components/Navigation/Breadcrumb';

export default {
	components: {
		appBreadcrumb: Breadcrumb
	},

	data() {
		return {
			localCategory: "All Devices",
			queryCategory: "all-devices"
		};
	},

	async asyncData(context) {
		let device = {};

		await db.doc(`india/amazon.in/device-details/${context.route.params.device.toUpperCase()}`).get()
		.then(doc => {
			if (doc.data()) {
				device = doc.data();
			}
		}).catch(error => console.log(error));

		return {
			device
		};
	},

	mounted() {

		if (localStorage.getItem("localCategory")) {
			this.localCategory = localStorage.getItem("localCategory");
			this.queryCategory = localStorage.getItem("queryCategory");

			localStorage.removeItem("localCategory");
			localStorage.removeItem("queryCategory");
		}
		
		console.log(this.localCategory);
		console.log(this.queryCategory);

		console.log(this.device);
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
		width: 100%;
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

	hr {
		width: 100%;
		border-top: 1px solid brown;
	}

	.price {
		font-size:1.5rem;
		color: brown;
	}

	.price-info {
		font-size: 0.8rem;
	}

	#at {
		position: relative;
		bottom: 5px;
		margin-left: 5px;
	}

	.seller img {
		height: 20px;
		margin: 0 10px;
		position: relative;
		top: 5px;
	}

	a, a:visited {
		text-decoration: none;
		color: black;
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
	}

	.firmwares .label {
		display: inline-block;
		margin-right: 20px;
		padding: 0;
	}

	.firmware {
		padding: 5px 10px;
		margin: 2px 3px;
		/*background-color: #2e3192;*/
		background-color: brown;
		border-radius: 10px;
		color: white;
		position: relative;
		top: -8px;
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
			margin: 10px 0;
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

	}
</style>