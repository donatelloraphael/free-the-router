<template>
	<a :href="mostPopular[cardPosition].productUrl" target="_blank">
		<div class="card">
			
			<div class="image" :style="{ 'background-image': 'url(' + mostPopular[cardPosition].imageUrl + ')' }"></div>
			
			<div class="description">
				<h3 class="name">{{ mostPopular[cardPosition].company }}  {{ mostPopular[cardPosition].name }}</h3>
				<p>{{ mostPopular[cardPosition].specs }}</p>
				<p>Price: <span>Rs: {{ mostPopular[cardPosition].price }}</span></p>
				<div class="firmwares">

					<img class="firmware openwrt" alt="openwrt logo" src="@/assets/images/firmwares/openwrt.png" v-if="mostPopular[cardPosition].firmwares.includes('openwrt')">

					<img class="firmware ddwrt" alt="ddwrt logo" src="@/assets/images/firmwares/ddwrt.png" v-if="mostPopular[cardPosition].firmwares.includes('ddwrt')">

					<img class="firmware gargoyle" alt="gargoyle logo" src="@/assets/images/firmwares/gargoyle.png" v-if="mostPopular[cardPosition].firmwares.includes('gargoyle')">

					<img class="firmware advancedtomato" alt="advanced tomato logo" src="@/assets/images/firmwares/advancedtomato.png" v-if="mostPopular[cardPosition].firmwares.includes('advancedtomato')">

					<img class="firmware freshtomato" alt="fresh tomato logo" src="@/assets/images/firmwares/freshtomato.png" v-if="mostPopular[cardPosition].firmwares.includes('freshtomato')">

					<img class="firmware tomatobyshibby" alt="tomato by shibby logo" src="@/assets/images/firmwares/tomatobyshibby.png" v-if="mostPopular[cardPosition].firmwares.includes('tomatobyshibby')">

				</div>
			</div>
			
		</div>
	</a>
</template>

<script>
	export default {
		name: "MostPopularCard",
		props: ["mostPopular", "cardPosition"]
	};
</script>

<style scoped>

	a {
		width: 100%;
		height: 100%;
		text-decoration: none;
	}

	.card {
		width: 100%;
		height: 100%;

	}

	.image {
		width: 100%;
		height: 60%;
		background: no-repeat center / 70%;
	}

	.description {
		height: 40%;
		background-color: #2e3192;
		text-decoration: none;
		color: white;
		font-family: "Montserrat", "Open Sans", sans-serif;
	}

	h3 {
		font-family: "Montserrat", "Open Sans", sans-serif;
		font-size: 1rem;
		font-weight: normal;
		padding: 5px 0;
	}

	p {
		font-size: 0.8rem;
	}

	span {
		font-size: 1rem;
		color: yellow;
	}

	.firmwares {
		display: flex;
		justify-content: center;
		padding: 0; 
		flex-wrap: wrap;
	}

	img.firmware {
		height: 15px;
		margin: 0 5px;
	}

	img.gargoyle {
		height: 25px;
	}

	img.freshtomato {
		height: 20px;
		border: 1px solid grey;
	}

	img.advancedtomato {
		height: 20px;
		border: 1px solid grey;
	}

	img.tomatobyshibby {
		height: 20px;
		border: 1px solid grey;
	}

</style>