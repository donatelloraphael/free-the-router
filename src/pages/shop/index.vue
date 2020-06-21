<template>
	<div class="container">

		<div class="main-grid">
			<div class="heading">

			</div>
		
			<div class="product-grid">
				<div class="item">
				</div>
			</div>

			<div class="pagination">

			</div>

		</div>
		
		
	</div>
</template>

<script>

export default {
	data() {
		return {
		};
	},

	computed: {
		query() {
			return this.$route.query;
		}
	},

	async asyncData(context) {

	 const deviceList = await context.store.dispatch("DeviceListModule/populateDeviceList", context.query);

		return {
			deviceList: deviceList
		}
	},

	mounted() {
		// console.log(this.query);
		console.log("Mounted: ", this.deviceList);
	}
};

	
</script>

<style scoped>

	.container {
		width: 100%;
	  min-height: 100vh;
	}

	.main-grid {
		width: 100%;
		height: 100%;
		padding-left: 16rem;
		background-color: pink;
	}

	.product-grid {
		min-height: 100%;
		width: 100%;
		position: relative;
		top: 8rem;
		background-color: cyan;
	}

	.heading {
		position: relative;
		top: 8rem;
		background-color: blue;
		height: 5rem;
		width: 100%;
	}

	.pagination {
		position: relative;
		bottom: 0;
		background-color: green;
		height: 10vh;
		width: 100%;
	}

	.item {
		height: 1200px;
		width: 400px;
		color: yellow;
	}

	@media (max-width: 768px) {
		.main-grid {
			padding-left: 0;
		}
	}
</style>