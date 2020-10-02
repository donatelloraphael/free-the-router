<template>
	<div class="most-popular">
		<h3>Most Popular</h3>
		<div class="container-mp" id="slider">
			
			<svg alt="navigate popular cards left" width="150px" height="150px" viewBox="8 0 20 15" @click="leftScroll(getCardCount())" @touchstart="toggleHover($event)" class="nav-angle nav-angle-left"><path d="M14.7 15.3a1 1 0 0 1-1.4 1.4l-4-4a1 1 0 0 1 0-1.4l4-4a1 1 0 0 1 1.4 1.4L11.42 12l3.3 3.3z"/></svg>

			<div class="cards card-1">			
				<app-most-popular-card :mostPopular="mostPopular" :cardPosition="cardPosition"></app-most-popular-card>
			</div>

			<div class="cards card-2">
				<app-most-popular-card :mostPopular="mostPopular" :cardPosition="cardPosition + 1"></app-most-popular-card>
			</div>

			<div class="cards card-3">
				<app-most-popular-card :mostPopular="mostPopular" :cardPosition="cardPosition + 2"></app-most-popular-card>
			</div>

			<div class="cards card-4">
				<app-most-popular-card :mostPopular="mostPopular" :cardPosition="cardPosition + 3"></app-most-popular-card>
			</div>

			<svg alt="navigate popular cards right" width="150px" height="150px" viewBox="-4 0 20 15" class="nav-angle nav-angle-right" @click="rightScroll(getCardCount())" @touchstart="toggleHover($event)"><path d="M9.3 8.7a1 1 0 0 1 1.4-1.4l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-1.4-1.4l3.29-3.3-3.3-3.3z"/></svg>

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
			};
		},
		methods: {
			getCardCount() {
				if (window.matchMedia("(max-width: 825px)").matches || window.matchMedia("(max-width: 789px)").matches) {
					return 2;
				} else if (window.matchMedia("(max-width: 1250px)").matches) {
					return 3;
				} else {
					return 4;
				}
			},

			leftScroll(cardCount) {
				// console.log(cardCount);
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
						return;
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
			  // console.log(this.cardPosition);
			  
			},

			toggleHover(event) {
				var el = event.target;
				el.style.color = "rgba(255, 0, 0, 0.5)";
				setTimeout(() => {
					el.style.color = "rgba(0, 0, 0, 0.5)";
				}, 200);
			},

			checkActiveDot(cardCount, dotNumber) {
				if (Math.floor(this.cardPosition / cardCount) === dotNumber) {
					return true;
				} else {
					return false;
				}
			}
		},

		mounted() {
			///////////////////////Swipe on touch///////////////////////////////////

			let cards = document.querySelectorAll('.cards');
			let vm = this;

			let	threshold = 50,
      		posX1 = 0,
      		posX2 = 0,
      		posY1 = 0,
      		posY2 = 0;

  		// Touch events
		  cards.forEach(card => {
		  	card.addEventListener('touchstart', dragStart);
		  	card.addEventListener('touchend', dragEnd);
		  	card.addEventListener('touchmove', dragAction);
		  });

		  function dragStart (e) {
		  	if (e.cancelable) {
		  		e = e || window.event;
			    e.preventDefault();
			    
			    posX1 = e.touches[0].clientX;
			    posY1 = e.touches[0].clientY;
		  	}
		  }

		  function dragAction (e) {
		    e = e || window.event;
		    
	      posX2 = posX1 - e.touches[0].clientX;
	      posY2 = posY1 - e.touches[0].clientY;	      
		  }

		  function dragEnd (e) {
		 
		    if (posX2 > threshold) {
		    	vm.rightScroll(vm.getCardCount());
		    } else if (posX2 < -threshold) {
		    	vm.leftScroll(vm.getCardCount());
		    }

		    if (posY2 > threshold) {
		    	window.scrollBy({
		    		top: posY2 * 1.5, 
		    		left: 0,
		    		behavior: "smooth"
		    	});
		    } else if (posY2 < -threshold) {
		    	window.scrollBy({
		    		top: posY2 * 1.5,
		    		left: 0,
		    		behavior: "smooth"
		    	});
		    }
		   
		  }
		}
		
	};
</script>

<style scoped>

  .most-popular {
  	width: 100%;
  }

	.popular {
		width: 100%;
	}

	h3 {
		font-size: 1.6rem;
		font-family: "Courier Prime", monospace;
		margin: 26px 20px 20px 20px;
	}

	.container-mp {
		width: 80vw;
		height: 25rem;
		margin: 30px auto;
		display: flex;
		position: relative;
		box-shadow: 0px 0px 8px;
		justify-content: space-between;
	}

	.cards {
		border-right: 2px solid white;
		height: 100%;
		width: 25%;
	}

	/*****************Navigation Arrow*************************/
	svg {
		padding: 0;
	}

	.nav-angle {
		position: absolute;
		top: 10%;
		cursor: pointer;
		transition: fill 0.4s ease;
		z-index: 100;
		padding: 0;
		fill: rgba(105, 26, 78, 0.5);
	}

	.nav-angle-left {
		left: 0;
	}

	.nav-angle-right {
		right: 0;
	}

	@media(hover: hover) {
		.nav-angle:hover {
			fill: rgba(255, 0, 0, 0.5);
		}
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

		.pagination-medium {
			display: none;
		}

		.pagination-small {
			display: block;
		}
	}

	@media (max-width: 789px) {
		.container-mp {
			width: 90vw;
			margin: 30px auto;
			height: 23rem;
		}
	}
</style>