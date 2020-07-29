<template>
	<div class="top-container">
		<div class="main" v-if="topPicks[selected][0]" :style="{ 'background-image': 'url(' + mainUrl + ')' }">
			<div class="contents">
				<p class="name">{{ topPicks[selected][0].amazonName }}</p>
				<p class="short-name">{{ topPicks[selected][0].company }}  {{ topPicks[selected][0].model }}</p>
				<p class="specs">{{ topPicks[selected][0].Flash }}MB Flash, {{ topPicks[selected][0].RAM }}MB RAM</p>
				<p class="price"><span class="label">Price: </span>{{$store.getters.getCurrency}} {{ topPicks[selected][0].amazonPrice.toLocaleString() }}* </p>
				<p class="price-disclaimer">*As of {{ topPicks[selected][0].amazonUpdatedOn }}</p>
				<nuxt-link class="link-container":to="{ path: `devices/${topPicks[selected][0].fullName.replace(/\ /g, '-')}` }" target="_blank">
					<button>Shop now</button>
				</nuxt-link>
			</div>
		</div>
		<div v-else class="placeholder"></div>
	
		<nuxt-link v-if="topPicks[selected][1]" class="link-container":to="{ path: `devices/${topPicks[selected][1].fullName.replace(/\ /g, '-')}` }" target="_blank">
			<div class="alt-1" :style="{ 'background-image': 'url(' + alt1Url + ')' }">
				<div class="alt1-contents">
					<p class="short-name">{{ topPicks[selected][1].company }}  {{ topPicks[selected][1].model }}</p>
					<p class="specs">{{ topPicks[selected][1].Flash }}MB Flash, {{ topPicks[selected][0].RAM }}MB RAM</p>
					<p class="price"><span class="label">Price: </span>{{$store.getters.getCurrency}} {{ topPicks[selected][1].amazonPrice.toLocaleString() }}*</p>
					<p class="price-disclaimer">*As of {{ topPicks[selected][1].amazonUpdatedOn }}</p>
				</div>
			</div>
		</nuxt-link>
		<a v-else class="placeholder" href="#"></a>

		<nuxt-link v-if="topPicks[selected][2]" class="link-container":to="{ path: `devices/${topPicks[selected][2].fullName.replace(/\ /g, '-')}` }" target="_blank">
			<div class="alt-2" :style="{ 'background-image': 'url(' + alt2Url + ')' }">
				<div class="alt2-contents">
					<p class="short-name">{{ topPicks[selected][2].company }}  {{ topPicks[selected][2].model }}</p>
					<p class="specs">{{ topPicks[selected][2].Flash }}MB Flash, {{ topPicks[selected][0].RAM }}MB RAM</p>
					<p class="price"><span class="label">Price: </span>{{$store.getters.getCurrency}} {{ topPicks[selected][2].amazonPrice.toLocaleString() }}*</p>
					<p class="price-disclaimer">*As of {{ topPicks[selected][2].amazonUpdatedOn }}</p>
				</div>
			</div>
		</nuxt-link>
		<a v-else class="placeholder" href="#"></a>
				
	</div>
	
</template>

<script>
export default {
	name: "TopPicksCard",
	props: ["topPicks", "selected"],
	data() {
		return {
			mainUrl: this.topPicks[this.selected][0] ? this.topPicks[this.selected][0].amazonThumbnail : "",
			alt1Url: this.topPicks[this.selected][1] ? this.topPicks[this.selected][1].amazonThumbnail : "",
			alt2Url: this.topPicks[this.selected][2] ? this.topPicks[this.selected][2].amazonThumbnail : ""
		}
	},
	
	watch: {
	 	selected() {
		 	this.mainUrl = this.topPicks[this.selected][0] ? this.topPicks[this.selected][0].amazonThumbnail : "";
	 		this.alt1Url = this.topPicks[this.selected][1] ? this.topPicks[this.selected][1].amazonThumbnail : "";
	 		this.alt2Url = this.topPicks[this.selected][2] ? this.topPicks[this.selected][2].amazonThumbnail : "";
	 	}
	},
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
		grid-area: main;
		min-width: 225px;
		background: no-repeat center / 70%;
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

	.alt-1, .alt-2 {
		cursor: pointer;
	}

	.alt-1 {
		grid-area: alt-1;
		min-width: 100px;
		height: 90%;
		background: no-repeat center / 80%;
		pointer: cursor;
	}

	.alt1-contents {
		color: white;
		background-color: rgba(54, 150, 200, 0.8);
		margin: 20px 10px;
		/*border-radius: 10px;*/
	}

	.alt-2 {
		grid-area: alt-2;
		min-width: 100px;
		background: no-repeat center / 80%;
		pointer: cursor;
		height: 90%;
	}

	.alt2-contents {
		color: white;
		background-color: rgba(154, 23, 193, 0.8);
		margin: 20px 10px;
	}
	
	a {
		text-decoration: none;
	}

	.placeholder {
		width: 100%;
		height: 100%;
	}

	.price-disclaimer {
		color: white;
		font-size: 0.7rem;
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