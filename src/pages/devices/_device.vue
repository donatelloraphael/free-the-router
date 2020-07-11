<template>
	<div class="container">
		<div class="container-padded">
			<div class="breadcrumb">
				<span class="category">{{ localCategory }}</span>
			</div>
		{{ device.name }}

		</div>
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
		this.localCategory = localStorage.getItem("localCategory");
		localStorage.removeItem("localCategory");
		console.log(this.localCategory);

		console.log(this.device);
	}
};
	
</script>

<style scoped>

.container {
	min-height: 100vh;
	width: 100%;
	background-color: yellow;
}

.container-padded {
	width: 100%;
	height: 100%;
	padding-top: 8rem;
}
	
</style>