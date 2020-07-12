<template>
	<div class="container">
		<div class="bg-left"></div>
		
		<div class="body">
			<div class="header">
				<app-breadcrumb :category="localCategory" :brand="device.company" :name="device.company + ' ' + device.model" :queryCategory="queryCategory"></app-breadcrumb>
				<h1 class="title">{{ device.name }}</h1>
			</div>

			<div class="content">
				<div class="images">
					<img class="main-img" :src="device.thumbnail" alt="device main image">
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
		margin: 30px auto;
		text-align: center;
		width: 80%;
	}

	/*******************CONTENT****************/
	.images img.main-img {
		width: 480px;
		height: auto;
		margin: 0 30px;
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
			
		}
		.images img.main-img {
			width: 60%;
			margin: 20px auto;
		}
	}

	@media (max-width: 789px) {
		.bg-left, .bg-right {
			display: none;
		}

		.images img.main-img {
			width: 80%;
		}

	}
</style>