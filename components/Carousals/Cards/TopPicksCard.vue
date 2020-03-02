<template>
	<div class="top-container">
		<div class="main" :style="{ 'background-image': 'url(' + mainUrl + ')' }" @click="logSelected()">
			<div class="contents">
				<p class="name">{{ topPicks[selected][0].nameDescription }}</p>
				<p class="short-name">{{ topPicks[selected][0].company }}  {{ topPicks[selected][0].name }}</p>
				<p class="specs">{{ topPicks[selected][0].specs }}</p>
				<p class="price"><span class="label">Price: </span>Rs. {{ topPicks[selected][0].price }}</p>
				<a  class="link-container":href="topPicks[selected][0].productUrl" target="_blank">
					<button>Shop now</button>
				</a>
			</div>
		</div>
	
		<a  class="link-container":href="topPicks[selected][1].productUrl" target="_blank">
			<div class="alt-1" :style="{ 'background-image': 'url(' + alt1Url + ')' }">
				<div class="alt1-contents">
					<p class="short-name">{{ topPicks[selected][1].company }}  {{ topPicks[selected][0].name }}</p>
					<p class="specs">{{ topPicks[selected][1].specs }}</p>
					<p class="price"><span class="label">Price: </span>Rs. {{ topPicks[selected][1].price }}</p>
				</div>
			</div>
		</a>

		<a  class="link-container":href="topPicks[selected][2].productUrl" target="_blank">
			<div class="alt-2" :style="{ 'background-image': 'url(' + alt2Url + ')' }">
				<div class="alt2-contents">
					<p class="short-name">{{ topPicks[selected][2].company }}  {{ topPicks[selected][2].name }}</p>
					<p class="specs">{{ topPicks[selected][2].specs }}</p>
					<p class="price"><span class="label">Price: </span>Rs. {{ topPicks[selected][2].price }}</p>
				</div>
			</div>
		</a>
				
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
			console.log(this.topPicks);
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


<style scoped>
	

	.top-container {
		display: grid;
		width: 100%;
		height: 100%;
		grid-template-areas: "main main alt-1"
												 "main main alt-2";
		font-family: "Montserrat", "Open Sans", sans-serif;
	}

	.link-container {
		background-color: rgba(0,0,0,0);
	}

	.main {
		/*background-color: magenta;*/
		grid-area: main;
		min-width: 225px;
		background: no-repeat center / 90%;
		pointer: cursor;
		height: 100%;
	}

	.contents {
		width: 30%;
		position: absolute;
		margin: 20px 10px;
		/*border-radius: 15px;*/
		background-color: rgba(52, 176, 68, 0.8);
		/*background-color: rgba(183, 183, 183, 0.5);*/
		font-size: 1rem;
		/*border-radius: 10px;*/
	}

	.name {
		color: white;
	}

	.contents .short-name {
		display: none;
	}

	p.specs {
		font-size: 0.8rem;
		color: white;
	}

	p.price {
		color: yellow;
	}

	p {
		margin: 5px 0;
	}

	.label {
		font-size: 0.8rem;
		color: white;
	}

	button {
		padding: 7px 10px;
		margin: 0 0 5px 0;
		background-color: blue;
		cursor: pointer;
		display: inline-block;
		color: white;
		border: none;
	}


	.alt-1 {
		/*background-color: red;*/
		grid-area: alt-1;
		min-width: 100px;
		height: 90%;
		background: no-repeat center / 100%;
		pointer: cursor;
	}

	.alt1-contents {
		color: white;
		background-color: rgba(54, 150, 200, 0.8);
		margin: 20px 10px;
		/*border-radius: 10px;*/
	}

	.alt-2 {
		/*background-color: pink;*/
		grid-area: alt-2;
		min-width: 100px;
		background: no-repeat center / 100%;
		pointer: cursor;
		height: 90%;
	}

	.alt2-contents {
		color: white;
		/*background-color: rgba(205, 11, 196, 0.5);*/
		background-color: rgba(154, 23, 193, 0.8);
		/*border-radius: 10px;*/
		margin: 20px 10px;
	}
	
	a {
		text-decoration: none;
	}


	/****************************MEDIA QUERYS*********************************/
	@media (max-width: 1200px) {
		.contents {
			width: 40%;
		}
	}

	@media (max-width: 1018px) {
		.contents .name {
			font-size: 0.9rem;
		}
	}

	@media (max-width: 789px) {
		.contents {
			width: 50%;
			font-size: 0.8rem;
		}

		.contents .name {
			font-size: 0.8rem;
		}

		.alt1-contents, .alt2-contents {
			font-size: 0.8rem;
		}
		

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

		a {
			margin: 0 0 5px 0;
			padding: 0;
			width: 50%;
			height: 40%;
		}

		.specs {
			font-size: 0.6rem !important;
		}

		.contents {
			width: 80%;
			/*font-family: "Open Sans", sans-serif;*/
			margin: 2% 5%;
		}

		.contents .short-name {
			font-size: 1rem;
			color: white;
		}

		p {
			padding: 0;
			margin: .2rem;
		}

		.contents .name {
			display: none;
		}

		.contents .short-name {
			display: block;
		}

		.alt-1 {
			width: 100%;
			height: 100%;
			display: inline-block;
			line-height: 1;
		}

		.alt-2 {
			width: 100%;
			height: 100%;
			display: inline-block;
			line-height: 1;
		}

		.alt1-contents, .alt2-contents {
			width: 100%;
			margin: 0;
			padding: 10px 0;
			font-size: 0.8rem
		}
	}




</style>