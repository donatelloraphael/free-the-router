<template>
	<div class="container">
		<div class="device">
			
		{{ device.name }}

		</div>
	</div>
	
</template>

<script>

import { db } from '~/plugins/firebase.js';

export default {

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
		console.log(this.device);
	}
};
	
</script>

<style scoped>

.container {
	min-height: 100vh;
	width: 100%;
}

.device {
	margin-top: 15rem;
}
	
</style>