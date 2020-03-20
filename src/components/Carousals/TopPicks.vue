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

				<div class="firmware" id="asuswrt-merlin" :class="{ active: 'asuswrt-merlin' == selected }" @click="selected = 'asuswrt-merlin'">
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
			}
		}
	};

</script>

<style scoped>

.top-picks-container {
	width: 90%;
	height: 30vw;
	margin: 50px auto;
	/*border: 1px solid grey;*/
	box-shadow: 0px 0px 8px;
	display: flex;
	flex-wrap: wrap-reverse;
}

.firmware-router {
	width: 70%;
	height: 100%;
	/*border-left: 3px solid #d4d4d4;*/
	box-shadow: -2px 0px 5px grey;
}


.firmware-name {
	width: 30%;
	height: 100%;
	/*background-color: yellow;*/
	display: flex;
	flex-direction: column;
	align-items: space-between;
	justify-content: center;
	padding: 5rem 0;
}

.firmware {
	display: flex;
	color: grey;
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
		/*grid-template-areas: "first second third";
		grid-template-columns: repeat( auto-fit, minmax(150px, 1fr));
		grid-template-rows: repeat(auto-fit, minmax(30px, 1fr));*/
	}

	.firmware-router {
		width: 100%;
		height: 85%;
		border: none;
		box-shadow: 0px 5px 5px;
	}

	.firmware {
		margin: 0;
		padding: auto;
		width: 170px;
		flex-shrink: 1;
		border: 1px solid grey;

	}

	.firmware p {
		margin: auto;
		padding: 0;
		display: inline-flex;
		line-height: 1;
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

@media (max-width: 789px) {
	.top-picks-container {
		width: 90vw;
		height: 70vw;
		margin: 30px auto;
	}

	.firmware-name {
		width: 100%;
		height: 30%;
		padding: 0 40px;
	}

	.firmware-router {
		width: 100%;
		height: 70%;
	}
}

@media (max-width: 470px) {
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