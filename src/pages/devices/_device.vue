<template>
	<div class="container">
		<div class="bg-left"></div>
		
		<div class="body">

      

		</div>

		<div class="bg-right"></div>
		
	</div>
</template>

<script>

import { db } from '~/plugins/firebase.js';

export default {

	data() {
		return {
			localCategory: "All Devices"
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

		// if (localStorage.getItem("localCategory")) {
			console.log("XX", localStorage.getItem("localCategory"));
			this.localCategory = localStorage.getItem("localCategory");
			localStorage.removeItem("localCategory");
		// }
		
		console.log(this.localCategory);

		console.log(this.device);
	}
};
	
</script>

<style scoped>

	.container {
		margin: 0 auto;
		width: 100%;
	  min-height: 100vh;
	  text-align: center;
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	}

	.body {
		padding-top: 10rem;
		height: 100%;
		width: 100%;
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
	}
</style>