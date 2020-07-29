<template>
	<div class="card">
		<nuxt-link :to="{ path: `devices/${deviceName}` }" target="_blank">

			<div class="image" :style="{ 'background-image': 'url(' + device.amazonThumbnail + ')' }"></div>
				
			<div class="description">
				<h3 class="name">{{ device.amazonName }}</h3>
				<p>{{ device.Flash }}MB Flash, {{ device.RAM }}MB RAM</p>
				<p>Price: <span>{{ $store.getters.getCurrency }} {{ device.amazonPrice.toLocaleString() }}*</span></p>
				<p class="price-disclaimer">*As of {{ device.amazonUpdatedOn }}</p>

				<div class="firmwares">

					<img class="firmware openwrt" alt="openwrt logo" src="@/assets/images/firmwares/openwrt.png" v-if="device.openwrtSupport">

					<img class="firmware ddwrt" alt="ddwrt logo" src="@/assets/images/firmwares/ddwrt.png" v-if="device.ddwrtSupport">

					<img class="firmware gargoyle" alt="gargoyle logo" src="@/assets/images/firmwares/gargoyle.png" v-if="device.gargoyleSupport">

					<img class="firmware advancedtomato" alt="advanced tomato logo" src="@/assets/images/firmwares/advancedtomato.png" v-if="device.advancedtomatoSupport">

					<img class="firmware freshtomato" alt="fresh tomato logo" src="@/assets/images/firmwares/freshtomato.png" v-if="device.freshtomatoSupport">

					<img class="firmware tomatobyshibby" alt="tomato by shibby logo" src="@/assets/images/firmwares/tomatobyshibby.png" v-if="device.tomatobyshibbySupport">

					<img class="firmware asuswrt-merlin" alt="Asuswrt-Merlin logo" src="@/assets/images/firmwares/asuswrt-merlin.png" v-if="device.asusMerlinSupport">

				</div>
			</div>


		</nuxt-link>
	</div>


</template>

<script>

export default {
	name: "ShopCard",
	props: ["device"],

	computed: {
		deviceName() {
			return this.device.id.replace(/\ /gm, "-");
		}
	}
};
	
</script>

<style scoped>
	
	.card {
		min-height: 25rem;
		width: 100%;
	}

	a {
		width: 100%;
		min-height: 25rem;
		text-decoration: none;
		display: block;
	}

	.image {
		width: 100%;
		height: 20rem;
		display: block;
		background: no-repeat center / 90%;
	}

	.description {
		height: auto;
		background-color: none;
		text-decoration: none;
		font-family: "Montserrat", sans-serif;
		color: black;
		position: relative;
		bottom: 0;
	}

	h3 {
		font-family: "Montserrat", sans-serif;
		font-size: 1rem;
		font-weight: bold;
		padding: 5px 0;
	}

	p {
		font-size: 0.8rem;
		margin-bottom: .5rem;
	}

	span {
		font-size: 1rem;
		color: rgb(176, 37, 2);
		font-weight: bold;
	}

	.price-disclaimer {
		color: black;
		font-size: 0.7rem;
	}

	.firmwares {
		display: flex;
		justify-content: left;
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

		.description {
			height: 50%;
		}
	}


</style>