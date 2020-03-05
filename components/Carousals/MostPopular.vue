<template>
	<div class="most-popular">
		<h3>Most Popular</h3>
		<div class="container-mp" id="slider">
			<div class="cards card-1">
				<i class="fas fa-angle fa-angle-left fa-angle-left-1" @click="leftScroll(4)"></i>
				<i class="fas fa-angle fa-angle-left fa-angle-left-2" @click="leftScroll(3)"></i>
				<i class="fas fa-angle fa-angle-left fa-angle-left-3" @click="leftScroll(2)"></i>
				<app-most-popular-card :mostPopular="mostPopular" :cardPosition="cardPosition"></app-most-popular-card>
			</div>

			<div class="cards card-2">
				<i class="fas fa-angle fa-angle-right fa-angle-right-3" @click="rightScroll(2)"></i>
				<app-most-popular-card :mostPopular="mostPopular" :cardPosition="cardPosition + 1"></app-most-popular-card>
			</div>

			<div class="cards card-3">
				<i class="fas fa-angle fa-angle-right fa-angle-right-2" @click="rightScroll(3)"></i>
				<app-most-popular-card :mostPopular="mostPopular" :cardPosition="cardPosition + 2"></app-most-popular-card>
			</div>

			<div class="cards card-4">
				<i class="fas fa-angle fa-angle-right" @click="rightScroll(4)"></i>
				<app-most-popular-card :mostPopular="mostPopular" :cardPosition="cardPosition + 3"></app-most-popular-card>
			</div>
		</div>

		<div class="pagination-large">
			<span class="dot" @click="cardPosition = 0" :class="{ active: checkActiveDot(4, 0) }"></span>
  		<span class="dot" @click="cardPosition = 4" :class="{ active: checkActiveDot(4, 1) }"></span>
  		<span class="dot" @click="cardPosition = 8" :class="{ active: checkActiveDot(4, 2) }"></span>
  		<span class="dot" @click="cardPosition = 12" :class="{ active: checkActiveDot(4, 3) }"></span>
		</div>

		<div class="pagination-medium">
			<span class="dot" @click="cardPosition = 0" :class="{ active: checkActiveDot(3, 0) }"></span>
  		<span class="dot" @click="cardPosition = 3" :class="{ active: checkActiveDot(3, 1) }"></span>
  		<span class="dot" @click="cardPosition = 6" :class="{ active: checkActiveDot(3, 2) }"></span>
  		<span class="dot" @click="cardPosition = 9" :class="{ active: checkActiveDot(3, 3) }"></span>
			<span class="dot" @click="cardPosition = 12" :class="{ active: checkActiveDot(3, 4) }"></span>
		</div>

		<div class="pagination-small">
			<span class="dot" @click="cardPosition = 0" :class="{ active: checkActiveDot(2, 0) }"></span>
  		<span class="dot" @click="cardPosition = 2" :class="{ active: checkActiveDot(2, 1) }"></span>
  		<span class="dot" @click="cardPosition = 4" :class="{ active: checkActiveDot(2, 2) }"></span>
  		<span class="dot" @click="cardPosition = 6" :class="{ active: checkActiveDot(2, 3) }"></span>
  		<span class="dot" @click="cardPosition = 8" :class="{ active: checkActiveDot(2, 4) }"></span>
  		<span class="dot" @click="cardPosition = 10" :class="{ active: checkActiveDot(2, 5) }"></span>
  		<span class="dot" @click="cardPosition = 12" :class="{ active: checkActiveDot(2, 6) }"></span>
  		<span class="dot" @click="cardPosition = 14" :class="{ active: checkActiveDot(2, 7) }"></span>
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
			leftScroll(cardCount) {
				if (cardCount === 4) {
					if (this.cardPosition <= 3) {
						return;
					}
				} else if (cardCount === 3) {
					if (this.cardPosition <= 2) {
						return;
					}
				} else {
					if (this.cardPosition <= 1) {
						return
					}
				}
				this.cardPosition -= cardCount;
			},
			rightScroll(cardCount) {
				if (cardCount === 4 || cardCount === 3) {
					if (this.cardPosition >= 12) {
						return;
					}
				} else {
					if (this.cardPosition >= 14) {
						return;
					}
				}
					
				this.cardPosition += cardCount;
			  console.log(this.cardPosition);
			},
			checkActiveDot(cardCount, dotNumber) {
				if (Math.floor(this.cardPosition / cardCount) === dotNumber) {
					return true;
				} else {
					return false;
				}
			}
		}
		
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

	/*****************Navigation Arrow*************************/
	.fa-angle {
		position: absolute;
		top: 32%;
		font-size: 100px;
		color: rgba(0, 0, 0, 0.5);
		cursor: pointer;
		transition: color 0.4s ease;
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
	
	.fa-angle-right-2 {
		display: none;
	}

	.fa-angle-right-3 {
		display: none;
	}

	.fa-angle-left-2 {
		display: none;
	}

	.fa-angle-left-3 {
		display: none;
	}

	/***************************Carousel Pagination***********************/
	.pagination select {
		border: none;
		display: flex;
		overflow: hidden;
	}

	.dot {
	  cursor: pointer;
	  height: 10px;
	  width: 30px;
	  margin: 0 2px;
	  background-color: #bbb;
	  border-radius: 10px;
	  display: inline-block;
	  transition: background-color 0.6s ease;
	}

	.active, .dot:hover {
  	background-color: #717171;
	}

	.pagination-medium {
		display: none;
	}

	.pagination-small {
		display: none;
	}

	/****************************Fading animation********************************/
	.fade {
	  -webkit-animation-name: fade;
	  -webkit-animation-duration: 1.5s;
	  animation-name: fade;
	  animation-duration: 1.5s;
	}

	@-webkit-keyframes fade {
	  from {opacity: .4}
	  to {opacity: 1}
	}

	@keyframes fade {
	  from {opacity: .4}
	  to {opacity: 1}
	}
	/**************************Media Querys********************************/
	@media (max-width: 1250px) {
		.cards {
			min-width: 33.3%;
		}

		.card-4 {
			display: none;
		}

		.fa-angle-right-2 {
			display: inline-block;
		}

		.fa-angle-left-2 {
			display: inline-block;
		}

		.fa-angle-left-1 {
			display: none;
		}

		.pagination-large {
			display: none;
		}

		.pagination-medium {
			display: block;
		}

		.pagination-small {
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

		.fa-angle-right-3 {
			display: inline-block;
		}

		.fa-angle-left-1 {
			display: none;
		}

		.fa-angle-left-2 {
			display: none;
		}

		.fa-angle-left-3 {
			display: inline-block;
		}

		.pagination-medium {
			display: none;
		}

		.pagination-small {
			display: block;
		}
	}

	@media (max-width: 789px) {
		.container-mp {
			margin: 30px auto;
		}
	}
</style>