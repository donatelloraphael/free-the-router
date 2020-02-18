<template>
	<div class="top-picks-container">
		<div class="firmware-name">
			<div class="firmware">
				<p>OpenWrt</p>
			</div>
			<div class="firmware">
				<p>DD-Wrt</p>
			</div>
			<div class="firmware">
				<p>Gargoyle</p>
			</div>
			<div class="firmware">
				<p>FreshTomato</p>
			</div>
			<div class="firmware">
				<p>AdvancedTomato</p>
			</div>
			<div class="firmware">
				<p>Tomato by Shibby</p>
			</div>
			

		</div>

		<div class="firmware-router">
			
		</div>
	</div>
	
</template>

<script>
import TopPicksCard from '@/components/Carousals/Cards/TopPicksCard';

	export default {
		name: "TopPicks",
		components: {
			TopPicksCard
		},

	};

</script>

<style>

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
	background-color: green;
	border-left: 3px solid #d4d4d4;
}


.firmware-name {
	width: 30%;
	height: 100%;
	background-color: yellow;
	display: flex;
	flex-direction: column;
	align-items: space-between;
	justify-content: center;
	padding: 5rem 0;
}

.firmware {
	display: flex;
	border: 1px solid grey;
	border-right: 5px solid orange;
	font-family: "Open Sans", sans-serif;

}

.firmware p {
	margin: 1.2rem auto;
}

/**************************Media Queries********************************/
@media (max-width: 1200px) {
	.top-picks-container {
		width: 70vw;
		height: 60vw;
		margin: 30px auto;
	}

	.firmware-name {
		width: 100%;
		height: 25%;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 0;
	}

	.firmware-router {
		width: 100%;
		height: 75%;
		border: none;
	}

	.firmware {
		padding: 10px 30px;
		flex-grow: 1;
	}

	.firmware p {
		margin: auto;
		padding: 0;
	}



}
@media (max-width: 768px) {
	.top-picks-container {
		width: 90vw;
		height: 80vw;
		margin: 30px auto;
	}

	.firmware-name {
		width: 100%;
		height: 25%;
	}

	.firmware-router {
		width: 100%;
		height: 75%;
	}
}
	

</style>