<template>
	<a :href="mostPopular[cardPosition].productUrl" target="_blank">
		<div class="card">
			<div class="image" :style="{ 'background-image': 'url(' + mostPopular[cardPosition].imageUrl + ')' }">
				
			</div>
			
		</div>
	</a>
</template>

<script>
	export default {
		name: "MostPopularCard",
		props: ["mostPopular", "cardPosition"],
		mounted() {
			console.log(this.mostPopular[this.cardPosition]);
		}
	};
</script>

<style scoped>

	a {
		width: 100%;
		height: 100%;
	}

	.card {
		width: 100%;
		height: 100%;
	}

	.image {
		width: 100%;
		height: 60%;
		background: no-repeat center / 80%;
	}

</style>