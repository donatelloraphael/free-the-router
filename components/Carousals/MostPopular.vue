<template>
	<div class="most-popular">
		<h3>Most Popular</h3>
		<div class="container-mp">
			<div class="cards card-1">
				<i class="fas fa-angle fa-angle-left" @click="leftScroll()"></i>
				<app-most-popular-card :mostPopular="mostPopular" :cardPosition="cardPosition"></app-most-popular-card>
			</div>

			<div class="cards card-2">
				<app-most-popular-card :mostPopular="mostPopular" :cardPosition="cardPosition + 1"></app-most-popular-card>
			</div>

			<div class="cards card-3">
				<app-most-popular-card :mostPopular="mostPopular" :cardPosition="cardPosition + 2"></app-most-popular-card>
			</div>

			<div class="cards card-4">
				<i class="fas fa-angle fa-angle-right" @click="rightScroll()"></i>
				<app-most-popular-card :mostPopular="mostPopular" :cardPosition="cardPosition + 3"></app-most-popular-card>
			</div>
		</div>
	</div>
	
</template>

<script>
	import MostPopularCard from "./Cards/MostPopularCard";

	export default {
		name: "MostPopular",
		props: ["mostPopular"],
		components: {
			appMostPopularCard: MostPopularCard
		},
		data() {
			return {
				cardPosition: 0
			}
		},
		methods: {
			leftScroll() {
				if (this.cardPosition <= 0) {
					return;
				} else {
					this.cardPosition -= 4;
				}
			},
			rightScroll() {
				if (this.cardPosition >= 12) {
					return;
				} else {
					this.cardPosition += 4;
					console.log(this.cardPosition);
				}
			}
		}
		// mounted() {
		// 	console.log("most popular: ", this.mostPopular);
		// }
	};
</script>

<style scoped>

	h3 {
		font-size: 1.6rem;
		font-family: "Courier Prime", monospace;
		margin: 20px;
	}

	.container-mp {
		width: 90%;
		height: 20rem;
		margin: 30px auto;
		display: flex;
		box-shadow: 0px 0px 8px;
		justify-content: space-between;
	}

	.cards {
		border: 1px solid grey;
		height: 100%;
		width: 25%;
		position: relative;
	}
	.fa-angle {
		position: absolute;
		top: 32%;
		font-size: 100px;
		color: rgba(0, 0, 0, 0.5);
		cursor: pointer;
	}

	.fa-angle:hover {
		color: rgba(255, 0, 0, 0.5);
	}

	.fa-angle-left {
		left: 0;
	}

	.fa-angle-right {
		right: 0;
	}

	@media (max-width: 1250px) {
		.cards {
			min-width: 33.3%;
		}

		.card-4 {
			display: none;
		}
	}

	@media (max-width: 825px) {
		.cards {
			min-width: 50%;
		}

		.card-3 {
			display: none;
		}
	}

	@media (max-width: 789px) {
		.container-mp {
			margin: 30px auto;
		}
	}
</style>