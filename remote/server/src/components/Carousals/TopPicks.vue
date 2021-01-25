<template>
	<div class="top-picks-container">
		<div class="firmware-name">
				<div class="firmware" id="openwrt" :class="{ active: 'openwrt' == selected }" @click="selected = 'openwrt'">
					<p>OpenWrt</p>
				</div>
			
				<div class="firmware" id="ddwrt" :class="{ active: 'ddwrt' == selected }" @click="selected = 'ddwrt'">
					<p>DD-Wrt</p>
				</div>
			
				<div class="firmware" id="gargoyle" :class="{ active: 'gargoyle' == selected }" @click="selected = 'gargoyle'">
					<p>Gargoyle</p>
				</div>
				
				<div class="firmware" id="freshtomato" :class="{ active: 'freshtomato' == selected }" @click="selected = 'freshtomato'">
					<p>FreshTomato</p>
				</div>
				
				<div class="firmware" id="advancedtomato" :class="{ active: 'advancedtomato' == selected }" @click="selected = 'advancedtomato'">
					<p>AdvancedTomato</p>
				</div>
				
				<div class="firmware" id="tomatobyshibby" :class="{ active: 'tomatobyshibby' == selected }" @click="selected = 'tomatobyshibby'">
					<p>Tomato by Shibby</p>
				</div>

				<div class="firmware" id="asuswrt-merlin" :class="{ active: 'asuswrt-merlin' == selected }" @click="selected = 'asusMerlin'">
					<p>Asuswrt-Merlin</p>
				</div>
		</div>

		<div class="firmware-router">
			<app-top-picks-card :topPicks="topPicks" :selected="selected"></app-top-picks-card>
		</div>
	</div>
	
</template>

<script>
import TopPicksCard from '@/components/Carousals/Cards/TopPicksCard';

	export default {
		name: "TopPicks",
		props: ["topPicks"],
		components: {
			appTopPicksCard: TopPicksCard
		},
		data() {
			return {
				selected: "openwrt"
			};
		}
	};

</script>

<style scoped>

.top-picks-container {
	width: 90%;
	height: 30vw;
	margin: 50px auto;
	box-shadow: 0px 0px 8px;
	display: flex;
	flex-wrap: wrap-reverse;
}

.firmware-router {
	width: 70%;
	height: 100%;
	-webkit-box-shadow: -4px 0px 5px -4px rgba(120,120,120,1);
	-moz-box-shadow: -4px 0px 5px -4px rgba(120,120,120,1);
	box-shadow: -4px 0px 5px -4px rgba(120,120,120,1);
}


.firmware-name {
	width: 30%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: space-between;
	justify-content: center;
	padding: 5rem 0;
}

.firmware {
	display: flex;
	border-top: 1px solid #bdbdbe;
	font-family: "Montserrat", "Open Sans", sans-serif;
	cursor: pointer;
}

.firmware:last-child {
	border-bottom: 1px solid #bdbdbe;
}

.firmware:hover {
	color: white;
	background-color: #8384b3;
}

.active {
	background-color: #2e3192 !important;
	color: white !important;
}

.firmware p {
	margin: 1rem 50px;
}



/**************************Media Queries********************************/
@media (max-width: 1200px) {
	.top-picks-container {
		width: 70vw;
		height: 50vw;
		margin: 30px auto 50px;
	}

	.firmware-name {
		width: 100%;
		height: 15%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 0 100px;
		position: relative;
		z-index: 100;

		-webkit-box-shadow: 0px -5px 5px -4px rgba(120,120,120,1);
		-moz-box-shadow: 0px -5px 5px -4px rgba(120,120,120,1);
		box-shadow: 0px -5px 5px -4px rgba(120,120,120,1);
	}

	.firmware-router {
		width: 100%;
		height: 85%;
		border: none;
	}

	.firmware {
		margin: 0;
		padding: auto;
		width: 170px;
		flex-shrink: 1;
		border: 1px solid grey;
		box-sizing: content-box;

	}

	.firmware p {
		margin: auto;
		padding: 0;
		display: inline-flex;
		line-height: 1;
	}

}

@media (max-width: 1200px) {
	#openwrt {
		border-bottom: none;
	}

	.firmware {
		border: none;
		background-color: #7678a0;
		margin: 0 2px 2px 0;
		color: white;
	}
}

@media (max-width: 1018px) {
	.firmware-name {
		padding: 0 50px;
	}

	.firmware {
		border: 1px solid grey !important;
	}

	.active {
		border-right: 5px solid #2e3192 !important;
	}
}

@media (max-width: 889px) {
	.top-picks-container {
		width: 90vw;
		height: 65vw;
		margin: 30px auto;
	}

	.firmware-name {
		width: 100%;
		height: 20%;
		padding: 0 40px;
	}

	.firmware-router {
		width: 100%;
		height: 70%;
	}
}

@media (max-width: 559px) {
	.top-picks-container {
		width: 90%;
		height: 100%;
		margin: 10px auto 30px;
	}

	.firmware {
		width: 100%;
	}

	.firmware-name {
		width: 100%;
		height: 25%;
		padding: 0;
	}

	.firmware-name p {
		padding: 10px 0;
	}

	.firmware-router {
		width: 100%;
	}
}
	

</style>