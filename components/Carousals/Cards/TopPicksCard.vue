<template>
	<div class="top-container">
		<div class="main" :style="{ 'background-image': 'url(' + mainUrl + ')' }" @click="logSelected()">
			
		</div>
		<div class="alt-1">
			
		</div>
		<div class="alt-2">
			
		</div>
		
	</div>
	
</template>

<script>
export default {
	name: "TopPicksCard",
	props: ["topPicks"],
	data() {
		return {
			selectedFirmware: "openwrt"
		}
	},
	methods: {
		logSelected() {
			setTimeout(() => {
				console.log('XXXXXXXXXX', this.topPicks);
			}, 5000);
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
		background-image: 
	}

	.alt-1 {
		/*background-color: red;*/
		grid-area: alt-1;
		min-width: 100px;
	}

	.alt-2 {
		/*background-color: pink;*/
		grid-area: alt-2;
		min-width: 100px;
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