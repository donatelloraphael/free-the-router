<template>
	<div class="top-container">
		<div class="main" :style="{ 'background-image': 'url(' + mainUrl + ')' }" @click="fillMostPopular()">
			
		</div>
		<div class="alt-1" :style="{ 'background-image': 'url(' + alt1Url + ')' }">
			
		</div>
		<div class="alt-2" :style="{ 'background-image': 'url(' + alt2Url + ')' }">
			
		</div>

		<app-fill-most-popular></app-fill-most-popular>
		
	</div>
	
</template>

<script>
export default {
	name: "TopPicksCard",
	props: ["topPicks", "selected"],
	data() {
		return {
			mainUrl: this.topPicks[this.selected][0].imageUrl,
			alt1Url: this.topPicks[this.selected][1].imageUrl,
			alt2Url: this.topPicks[this.selected][2].imageUrl
		}
	},
	methods: {
		logSelected() {
			console.log(this.selected);
		}
	},
	watch: {
	 	selected() {
		 	this.mainUrl = this.topPicks[this.selected][0].imageUrl;
	 		this.alt1Url = this.topPicks[this.selected][1].imageUrl;
	 		this.alt2Url = this.topPicks[this.selected][2].imageUrl;
	 	}
	 }
};
	
</script>


<style>
	

	.top-container {
		display: grid;
		width: 100%;
		height: 100%;
		grid-template-areas: "main main alt-1"
												 "main main alt-2";
	}

	.main {
		/*background-color: magenta;*/
		grid-area: main;
		min-width: 225px;
		background: no-repeat center / 90%;
	}

	.alt-1 {
		/*background-color: red;*/
		grid-area: alt-1;
		min-width: 100px;
		background: no-repeat center / 100%;
	}

	.alt-2 {
		/*background-color: pink;*/
		grid-area: alt-2;
		min-width: 100px;
		background: no-repeat center / 100%;
	}
		
	@media (max-width: 470px) {
		.top-container {
			display: flex;
			height: 100vw;
			flex-wrap: wrap;
		}

		.main {
			width: 100%;
			height: 60%;
		}		

		.alt-1 {
			width: 50%;
			height: 40%;
		}

		.alt-2 {
			width: 50%;
			height: 40%;
		}
	}


</style>