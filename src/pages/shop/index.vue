<template>
	<div class="container">

		<div class="main-grid">
			<div class="heading">
				<h3>{{deviceRange}} of {{numDevices}} results for <span class="category">{{category}}</span></h3>
				<span class="filter-info" v-if="numFilters">{{numFilters}} filters applied</span>

			</div>
		
			<div class="product-grid">
				<div class="item" v-for="device in deviceList">
					<app-shop-card :device="device"></app-shop-card>
				</div>
			</div>

			<div class="pagination">
				<app-pagination :currentPage="currentPage" :numPages="numPages"></app-pagination>
			</div>

		</div>
		
		
	</div>
</template>

<script>
import ShopCard from  "../../components/Carousals/Cards/ShopCard";
import Pagination from "../../components/Navigation/ThePagination";

export default {
	watchQuery: ['brand', 'category', 'page', 'search', 'ram', 'flash', 'sort', 'price', 'firmware', 'reset'],

	components: {
		appShopCard: ShopCard,
		appPagination: Pagination
	},

	data() {
		return {
			numFilters: 0
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
			if (Object.keys(this.query).length > 0) {
				switch (this.query.category) {
					case "routers": return "Routers";
					case "modems": return "Modems";
					case "repeaters-extenders": return "Repeaters & Extenders";
					case "wireless-access-points": return "Wireless Access Points";
					case "all-devices": return "All Devices";
					default: return "Routers";
				}
			} else {
				return "Routers";
			}
		},
		deviceRange() {
			if (parseInt(this.query.page)) {
				let start = parseInt(this.query.page) * 18 - 17;
				return `${start}-${start + this.deviceList.length - 1}`;
			} else {
				return "1-" + this.deviceList.length;
			}
		},
		currentPage() {
			return this.$route.query.page ? parseInt(this.$route.query.page) : 1;
		}
	},

	async asyncData(context) {

		let [deviceList, numPages, numDevices] = await context.store.dispatch("DeviceListModule/populateDeviceList", context.query);

		let query = context.query;

		delete query.category;
		delete query.search;
		delete query.sort;
		delete query.reset;

		return {
			deviceList: deviceList ? deviceList : [],
			numPages: numPages ? numPages : 1,
			numDevices: numDevices ? numDevices : 0,
			numFilters: Object.keys(query).length
		};
	},

	mounted() {
		this.$store.dispatch("DeviceListModule/setFiltersToggle");				
		
		console.log("Mounted: ", this.deviceList);
		console.log('Pages: ', this.numPages);
		console.log('category: ', this.category);
		console.log('numDevices: ', this.numDevices);
		console.log('Range: ', this.deviceRange);
		console.log("Current Page: ", this.currentPage);
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
		height: auto;
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
		/*margin-bottom: 8rem;*/
	}

	.heading {
		position: relative;
		top: 8rem;
		/*background-color: blue;*/
		height: 5rem;
		width: 100%;
	}
	
	.filter-info {
		background-color: #2e3192;
		padding: 5px 10px;
		margin-left: 10px;
		color: white;
		font-family: "Montserrat", sans-serif;
		font-size: 0.9rem;
		border-radius: 10px;
	}


	.pagination {
		position: relative;
		bottom: 0;
		height: 10rem;
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
		min-height: 25rem;
		max-width: 480px;
		height: 20%;
		width: 20%;
		min-width: 320px;
		max-width: 480px;
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