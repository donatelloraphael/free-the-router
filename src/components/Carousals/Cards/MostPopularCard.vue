<template>
	<nuxt-link :to="{ path: `devices/${mostPopular[cardPosition].fullName.replace(/\ /g, '-')}` }" target="_blank">
		<div class="card">
			
			<div class="image" :style="{ 'background-image': 'url(' + mostPopular[cardPosition].amazonThumbnail + ')' }"></div>
			
			<div class="description">
				<h3 class="name">{{ mostPopular[cardPosition].company }}  {{ mostPopular[cardPosition].model }}</h3>
				<p>{{ mostPopular[cardPosition].RAM }}MB RAM, {{ mostPopular[cardPosition].Flash }}MB Flash</p>
				<p>Price: <span>Rs: {{ mostPopular[cardPosition].amazonPrice }}</span></p>
				<div class="firmwares">

					<img class="firmware openwrt" alt="openwrt logo" src="@/assets/images/firmwares/openwrt.png" v-if="mostPopular[cardPosition].openwrtSupport">

					<img class="firmware ddwrt" alt="ddwrt logo" src="@/assets/images/firmwares/ddwrt.png" v-if="mostPopular[cardPosition].ddwrtSupport">

					<img class="firmware gargoyle" alt="gargoyle logo" src="@/assets/images/firmwares/gargoyle.png" v-if="mostPopular[cardPosition].gargoyleSupport">

					<img class="firmware advancedtomato" alt="advanced tomato logo" src="@/assets/images/firmwares/advancedtomato.png" v-if="mostPopular[cardPosition].advancedtomatoSupport">

					<img class="firmware freshtomato" alt="fresh tomato logo" src="@/assets/images/firmwares/freshtomato.png" v-if="mostPopular[cardPosition].freshtomatoSupport">

					<img class="firmware tomatobyshibby" alt="tomato by shibby logo" src="@/assets/images/firmwares/tomatobyshibby.png" v-if="mostPopular[cardPosition].tomatobyshibbySupport">

					<img class="firmware asuswrt-merlin" alt="Asuswrt-Merlin logo" src="@/assets/images/firmwares/asuswrt-merlin.png" v-if="mostPopular[cardPosition].asusMerlinSupport">

				</div>
			</div>
			
		</div>
	</nuxt-link>
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
		font-family: "Montserrat", sans-serif;
	}

	h3 {
		font-family: "Montserrat", sans-serif;
		font-size: 1rem;
		font-weight: bold;
		padding: 5px 0;
	}

	p {
		font-size: 0.8rem;
	}

	span {
		font-size: 1rem;
		color: yellow;
		font-weight: bold;
	}

	.firmwares {
		display: flex;
		justify-content: center;
		padding: 0; 
		flex-wrap: wrap;
		margin-top: 10px;
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

	img.asuswrt-merlin {
		height: 22px;
	}

	@media (max-width: 789px) {
		.image {
			height: 50%;
		}
		
		.description {
			height: 50%;
		}
	}

</style>