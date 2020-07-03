<template>
	<div class="container">

		<div class="main-grid">
			<div class="heading">
				<h3>{{deviceRange}} of {{numDevices}} results for <span class="category">{{category}}</span></h3>
			</div>
		
			<div class="product-grid">
				<div class="item" v-for="device in deviceList">
					<app-shop-card :device="device"></app-shop-card>
				</div>
			</div>

			<div class="pagination">

			</div>

		</div>
		
		
	</div>
</template>

<script>
import ShopCard from  "../../components/Carousals/Cards/ShopCard";

export default {
	watchQuery: ['brands', 'category', 'page', 'q', 'search', 'ram', 'flash', 'sort', 'price', 'firmware'],

	components: {
		appShopCard: ShopCard
	},

	data() {
		return {
		};
	},

	computed: {
		query() {
			return this.$route.query;
		},
		category() {
			if (this.query.search) {
				return `"${this.query.search}"`;
			}

			switch (this.query.category) {
				case "routers": return "Routers"; break;
				case "modems": return "Modems"; break;
				case "repeaters-extenders": return "Repeaters & Extenders"; break;
				case "wireless-access-points": return "Wireless Access Points"; break;
				case "all-devices": return "All Devices"; break;
				default: return "Routers"; break;
			}
		},
		deviceRange() {
			if (parseInt(this.query.page)) {
				let start = parseInt(this.query.page) * 18 - 17;
				return `${start}-${start + this.deviceList.length - 1}`;
			} else {
				return "1-" + this.deviceList.length;
			}
		}
	},


	async asyncData(context) {
	
		let amazonUpdated = await context.store.dispatch("DeviceListModule/setAmazonUpdateTime");
		let [deviceList, numPages, numDevices] = await context.store.dispatch("DeviceListModule/populateDeviceList", context.query);
					
		return {
			deviceList,
			numPages,
			numDevices,
			amazonUpdated
		}
	},

	mounted() {
		console.log("Mounted: ", this.deviceList);
		console.log('Pages: ', this.numPages);
		console.log('category: ', this.category);
		console.log('numDevices: ', this.numDevices);
		console.log('Updated: ', this.amazonUpdated);
		console.log('Range: ', this.deviceRange);
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
		/*background-color: pink;*/
	}

	.product-grid {
		min-height: 100%;
		width: 100%;
		position: relative;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		padding: 2%;
		top: 8rem;
		background-color: cyan;
		/*margin-bottom: 8rem;*/
	}

	.heading {
		position: relative;
		top: 8rem;
		/*background-color: blue;*/
		height: 5rem;
		width: 100%;
	}

	.pagination {
		position: relative;
		bottom: 0;
		background-color: green;
		height: 10vh;
		width: 100%;
		margin-top: 5rem;
	}

	/* Page Information Header*/
	
	.heading {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	h3 {
		font-size: 1.2rem;
		font-weight: bold;
		text-align: center;
	}

	.category {
		font-size: 1.6rem;
		font-weight: bold;
	}

	/*Product Grid*/

	.item {
		min-height: 320px;
		max-width: 480px;
		height: 20%;
		width: 20%;
		min-width: 320px;
		max-width: 480px;
		background-color: yellow;
		margin: 0 1rem 5% 1rem;
	}


	/*MEDIA QUERYS*/

	@media (max-width: 1072px) {
		.product-grid {
			padding: 2% 0;
		}
	}

	@media (max-width: 768px) {
		.main-grid {
			padding-left: 0;
		}
	}
</style>