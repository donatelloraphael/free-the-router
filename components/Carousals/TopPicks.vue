<template>
	<div class="top-picks-container">
		<div class="firmware-name"></div>
		<div class="firmware-router"></div>
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

.firmware-name {
	width: 30%;
	height: 100%;
	background-color: yellow;
}

.firmware-router {
	width: 70%;
	height: 100%;
	background-color: green;
}


/**************************Media Queries********************************/
@media (max-width: 1200px) {
	.top-picks-container {
		width: 70vw;
		height: 50vw;
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