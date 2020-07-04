<template>
	<div class="pagination">
		<div class="navButtons">
			<button class="buttons previous" @click="changePage(currentPage - 1)" :disabled="currentPage < 2">Previous</button>

			<button class="buttons numbered" :class="{ active: currentPage == 1 }" @click="changePage(1)" v-if="numPages > 0" :disabled="currentPage == 1">1</button>
			<button class="buttons numbered" v-if="currentPage > 3">...</button>
			
			<div  class="numberedButtons" v-if="currentPage < 3">
				<button class="buttons" :class="{ active: currentPage == 2 }" @click="changePage(2)" v-if="numPages > 1" :disabled="currentPage == 2">2</button>
				<button class="buttons" :class="{ active: currentPage == 3 }" @click="changePage(3)" v-if="numPages > 2" :disabled="currentPage == 3">3</button>
			</div>
			<div class="numberedButtons" v-else>
					<button class="buttons" @click="changePage(currentPage - 1)">{{ currentPage - 1}}</button>
					<button class="buttons active" disabled>{{ currentPage }}</button>
					<button class="buttons" @click="changePage(currentPage + 1)" v-if="currentPage + 1 <= numPages">{{ currentPage + 1 }}</button>
			</div>
			<button class="buttons numbered" v-if="currentPage + 2 < numPages">...</button>

			<button class="buttons numbered" @click="changePage(numPages)" v-if="currentPage + 1 < numPages">{{ numPages }}</button>

			<button class="buttons next" @click="changePage(currentPage + 1)" :disabled="currentPage >= numPages">Next</button>
		</div>

	</div>
	
</template>

<script>

export default {
	name: "Pagination",

	props: ["currentPage", "numPages"],

	computed: {
		querys() {
			let querys = this.$route.query;
			delete querys["page"];
			return querys;
		}
	},

	methods: {
		changePage(page) {
			this.$router.push({ path: 'shop', query: {...this.querys, page: `${page}` }});
		}
	},

	mounted() {
		console.log('PAGE curr: ', this.currentPage);
		console.log('PAGE num: ', this.numPages);
		console.log("QUERYS: ", this.querys);
	}
};
</script>

<style scoped>
	
	.pagination {
		width: 100%;
		height: 3rem;
		display: flex;
		align-items: center;
	}

	.navButtons {
		width: 100%;
		height: auto;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	button {
		height: auto;
		width: auto;
		padding: 10px;
		border: 1px solid black;
		border-radius: 3px;
		margin: 0 3px;
		background-color: #2e3192;
		color: white;
		font-family: "Montserrat", sans-serif;
		font-size: 1rem;
		cursor: pointer;
	}

	.numberedButtons {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	button.numbered {
		width: 2rem;
	}

	button.active {
		border: 2px solid #2e3192;
		background-color: white;
		color: black;
	}

	a {
		text-decoration: none;
	}

</style>