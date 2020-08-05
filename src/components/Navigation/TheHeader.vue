<template>
	<div>
		<section id="header" class="header navigation-bar-scroll">
	    <div class="pre-header">
	    	<nuxt-link :to="{ path: `/${$store.getters.getCountry}/` }">
	    		<div class="logo"></div>
	    	</nuxt-link>

				<form  class="search">
					
					<span class="searchDropdown dropdown">
      			<select class="dropdown-menu" @click="searchCategory=$event.target.value" aria-haspopup="true" aria-expanded="false" aria-labelledby="searchDropdown">
							<option class="dropdown-item" value="all-devices">All</option>
    					<option class="dropdown-item" value="routers">Routers</option>
							<option class="dropdown-item" value="wireless-access-points">Wireless Access Points</option>
							<option class="dropdown-item" value="repeaters-extenders">Repeaters & Extenders</option>
							<option class="dropdown-item" value="modems">Modems</option>
						</select>
					</span>

					<input class="search-box" :class="{ disabled: searchValidation }" type="text" v-model="searchTerm" placeholder="Search here">
					<button type="submit" @click.stop.prevent="search()" :disabled="searchValidation">Search</button>
					<span id="searchError" v-if="searchValidation">Search can only contain letters, digits, spaces, and "-".</span>
				</form>
	   
				<div class="country">
	  			<select id="countrySelector" class="dropdown-menu" @change="setCountry($event.target.value); getFlagUrl(); redirectCountry($event.target.value);" aria-haspopup="true" aria-expanded="false" aria-labelledby="navbarDropdown">
						<option class="dropdown-item" value="US" :selected="'US' == $store.getters.getCountry">USA</option>
						<option class="dropdown-item" value="IN" :selected="'IN' == $store.getters.getCountry">India</option>
						<option class="dropdown-item" value="CA" :selected="'CA' == $store.getters.getCountry">Canada</option>
						<option class="dropdown-item" value="UK" :selected="'UK' == $store.getters.getCountry">UK</option>
					</select>
					<span id="country-flag" :style="{ background: 'no-repeat center/100% ' + flagUrl }"/>
				</div>
						
			

   		</div>
    
	    <nav class="navbar">
	    	
    		<span class="menu__toggler" @click="toggleActive()" :class="{ active: isActive }" :is-active="isActive"><span></span></span> <!-- Don't delete extra span -->

    		<span id="filter-menu-toggler" @click="toggleFilterMenuActive()" :class="{ active: isShopPage }">Filter</span>
    	
	    	<ul class="navbar-list navbar-nav mr-auto">
	    		<li class="nav-item"><nuxt-link :to="{ path: `/${$store.getters.getCountry}/` }" exact>Home</nuxt-link></li>
	        <li class="nav-item"><nuxt-link :to="{ path: `/${$store.getters.getCountry}/shop/` }">Shop</nuxt-link></li>
	        <li class="nav-item"><nuxt-link :to="{ path: `/${$store.getters.getCountry}/firmware/` }">Firmware</nuxt-link></li>
	        <li class="nav-item"><nuxt-link :to="{ path: `/${$store.getters.getCountry}/supported-devices/` }">Supported Devices</nuxt-link></li>
	        <li class="nav-item"><nuxt-link :to="{ path: `/${$store.getters.getCountry}/resources/` }">Resources</nuxt-link></li>
	        <li class="nav-item"><nuxt-link :to="{ path: `/${$store.getters.getCountry}/about/` }">About Us</nuxt-link></li>
	    	</ul>
	    </nav>

	    	

  	</section>
  	
  	<app-sidenav @close="isActive = false" :is-active="isActive"></app-sidenav>
  	<app-filter-menu @close="isFilterMenuActive = false" :is-active="isFilterMenuActive"></app-filter-menu>

  
  </div>
</template>

<script>
	import {db, firebase} from "~/plugins/firebase.js";

	import TheSideNav from "@/components/Navigation/TheSideNav";
	import TheFilterMenu from "@/components/Navigation/TheFilterMenu";

	export default {
		name: "TheHeader",

		data() {
			return {
				isActive: false,
				isFilterMenuActive: false,
				lastScrollTop: 0,
				flagUrl: this.$store.getters.getFlagUrl,
				searchTerm: "",
				searchCategory: "all-devices"
			};
		},

		components: {
			appSidenav: TheSideNav,
			appFilterMenu: TheFilterMenu
		},

		computed: {
			searchValidation() {
				return /[^\w-\s]|_/gmi.test(this.searchTerm);
			},
			isShopPage() {
				return /\/[a-z]+\/shop/gi.test(this.$route.path);
			}
		},

		methods: {
			toggleActive() {
				this.isActive = !this.isActive;
			},
			toggleFilterMenuActive() {
				this.isFilterMenuActive = !this.isFilterMenuActive;
			},
			setCountry(country) {
				this.$store.dispatch("setCountry", country);
			},
			getFlagUrl() {
				setTimeout(() => {
					this.flagUrl = this.$store.getters.getFlagUrl;
				}, 2);
			},
			redirectCountry(country) {
				this.$router.push(this.$route.path.replace(/^\/[A-Z]+\//gi, `/${country}/`));
			},
			search() {
				let args = "";
				let argsArray = this.searchTerm.toUpperCase().split(/(\s)/gm).map(el => el.trim());

				for (let i = 0; i < argsArray.length; i++) {
					if (argsArray[i]) {
						if (i == 0) {
							args += argsArray[i];
						} else {
							args += "_" + argsArray[i];
						}
					} 
				}
				this.searchTerm = "";
				this.$router.push({ path: `/${this.$store.getters.getCountry}/shop/`, query: { search: args, category: this.searchCategory} });
			}
		},

		created() {

			//////////////////// Set Flag URL on country change from Side Nav ///////////////
			let vm1 = this;

			this.$store.watch(
				function(state) {
					vm1.flagUrl = vm1.$store.getters.getFlagUrl;
				}
			);
		},

		mounted() {
			
			window.onload = function() {

				let didScroll;

				// on scroll, let the interval function know the user has scrolled
				window.addEventListener("scroll", (function(event){
				  didScroll = true;
				}));

				// run hasScrolled() and reset didScroll status
				setInterval(function() {
				  if (didScroll) {
				    hasScrolled();
				    didScroll = false;
				  }
				}, 250);

				let vm = this;
				let header = document.getElementById('header');
				var navbarHeight = header.offsetHeight;

				function hasScrolled() {
					var delta = 5;
					var scrollPosition = window.scrollY;

					if (Math.abs(vm.lastScrollTop  - scrollPosition) <= delta) {
	  				return;
	  			}

	  			// If current position > last position AND scrolled past navbar...
					if (scrollPosition > vm.lastScrollTop && scrollPosition > navbarHeight) {  
						// Scroll Down
	  				header.classList.remove('header-down');
	  				header.classList.add('header-up');
	  			} else {  
	  				// Scroll Up
	  				// If did not scroll past the document (possible on mac)...  
	  					let windowHeight = window.innerHeight;
	  					let docHeight = document.body.clientHeight;
	  					if(scrollPosition + windowHeight < docHeight) { 
	    					header.classList.remove('header-up');
	    					header.classList.add('header-down');
	  					}
					}

					vm.lastScrollTop = scrollPosition;
				}
			};
			
      firebase.analytics();
		}
	};

</script>

<style scoped>
	/*************************************HEADER***************************************/
	.header {
    /*grid-area: header;*/
    width: 100%;
    height: auto;
    position: fixed;
    z-index: 300;
    background-color: white;
    transition: top 0.2s ease-out;
    display: grid;
    grid-template-areas: "hd1"
    										 "hd1"
                         "nav";
  }

  .header-up {
  	top: -8rem;
  }

  .header-down {
  	top: 0;
  }

  .pre-header {
    grid-area: hd1;
    display: flex;
    height: 5rem;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
  	height: 4em;
  	width: 6em;
  	background: no-repeat center/100% url("~assets/images/free-the-router.png");
  	margin: 10px;
  }

	.nav-item a {
		text-decoration: none;
		color: black;
		margin: 10px 10px;
  	padding: 0 0;
	}

	.nav-item a:hover {
		color: green;
	}

	nav {
		font-family: 'Courier Prime', monospace;
		font-size: 0.9rem;
	}

	.search {
		display: flex;
		justify-items: center;
		position: relative;
	}

	input.search-box {
		height: 2rem;
		width: 20vw;
		font-size: 0.9rem;
		padding: 0 0 0 10px;
		border: 1px solid grey;
		border-right: none;
		flex-shrink: 1;
	}

	input.search-box:focus {
		border: 2px solid #65c9ed;
	}

	.search button {
		background-color: #e2e2e2;
		padding: 0 5px;
		border: 1px solid grey;
		font-family: "Courier Prime", monospace;
		border-radius: 0 5px 5px 0;
		cursor: pointer;
	}

	.disabled {
		border: 2px solid red !important;
	}

	#searchError {
		font-size: 0.8rem;
		color: red;
		position: absolute;
		bottom: -1rem;
	}

	.searchDropdown {
		border: 1px solid grey;
		display: flex;
		align-items: center;
		border-radius: 5px 0 0 5px;
		border-right: none;
		width: 4rem;
	}

	.dropdown {
		position: relative;
	}

	.dropdown-toggle {
		display: inline-block;
	}

	.country {
		min-width: 50px;
		margin-right: 10px;
		display: relative;
	}

	#country-flag {
		width: 1.5rem;
		height: .9rem;
		position: absolute;
		z-index: 10000;
		top: 16px;
		right: 32px;
	}
	

	/**********************************Dropdown****************************************/
	
	.dropdown-menu {
	  margin: 0;
	  padding: 0;
	  min-width: 40px;
	  background-color: white;
	  font-family: "Courier Prime", monospace;
	  font-size: 0.9rem;
	  z-index: 1000;
	  border: none;
	}

	.dropdown-menu:hover {
		color: green;
		cursor: pointer;
	}

	/*************************************NAVBAR***************************************/

	.navbar {
    grid-area: nav;
    display: flex;
    position: relative;
    z-index: 10;
    background-color: #2e3192;
    height: 3rem;
    align-items: center;
		padding: 0;
		border: none;
		box-shadow: -1px 2px 5px;
  }

	.navbar-list {
		display: flex;
		flex-direction: row;
		list-style: none;
		padding: auto 100px;
		height: 3rem;
		width: 100%;
		margin: 0;
		/*background-color: magenta;*/
		justify-content: center;
		align-items: center;
	}

	.navbar-list a {
		font-weight: bold;
		color: white;
		font-size: 1.1rem;
		padding: 0 2rem;
		display: inline-flex;
		align-items: center;
		/*background-color: red;*/
		height: 3rem;
		flex-shrink: 3;
	}

	.navbar-list a.nuxt-link-active, .navbar-list a.active {
		color: #deff00 !important;
		border-bottom: 4px solid #deff00;
	}

	.navbar-list a:hover {
		color: white;
		background-color: #0686f1;
	}

	/**********************************Side Menu Toggler**************************************/

	.menu__toggler {
	  position: absolute;
	  top: 10px;
	  left: 20px;
	  z-index: 999;
	  height: 28px;
	  width: 28px;
	  outline: none;
	  cursor: pointer;
	  display: flex;
	  align-items: center;
	}
	.menu__toggler span,
	.menu__toggler span::before,
	.menu__toggler span::after {
	  position: absolute;
	  content: '';
	  width: 28px;
	  height: 2.5px;
	  background: #fafafa;
	  border-radius: 20px;
	  transition: 500ms cubic-bezier(0.77, 0, 0.175, 1);
	}
	.menu__toggler span::before {
	  top: -8px;
	}
	.menu__toggler span::after {
	  top: 8px;
	}
	.menu__toggler.active > span {
	  background: transparent;
	}
	.menu__toggler.active > span::before, .menu__toggler.active > span::after {
	  background: #fff;
	  top: 0px;
	}
	.menu__toggler.active > span::before {
	  -webkit-transform: rotate(-225deg);
	          transform: rotate(-225deg);
	}
	.menu__toggler.active > span::after {
	  -webkit-transform: rotate(225deg);
	          transform: rotate(225deg);
	}

	/************************************FILTER MENU TOGGLER*******************************/

	#filter-menu-toggler {
		color: white;
		position: absolute;
		display: none;
		font-weight: bold;
		right: 2rem;
		padding: 10px 20px;
		cursor: pointer;
		background-color: #4146c1;
		box-shadow: 0px 2px 5px rgba(0, 0, 0, 1);
	}

	#filter-menu-toggler:hover {
		color: yellow;
	}

	#filter-menu-toggler.active {
		display: block;
	}


	/*************************************MEDIA QUERIES***************************************/
	@media (max-width: 922px) {
		#searchError {
			bottom: -1.5rem;
			font-size: 0.7rem;
		}

		.navbar-list a {
			padding: 0 1rem;
		}
	}

	/*Header Toggle*/
	@media (max-width: 768px) {		

		.navbar-list {
			display: none;
		}

		.search input {
			font-size: 0.7rem;
			padding-left: 2px;
			width: 18vw;
		}

		.search input:focus {
			font-size: 0.9rem;
		}

		.searchDropdown {
			width: 3rem;
		}

		.country {
			margin: 0;
		}
	}

	@media (min-width: 769px) {
		.menu__toggler	{
			display: none;
		}

		#filter-menu-toggler.active {
			display: none;
		}

		.search input {
			max-width: 10rem;
			font-size: 0.9rem;
		}
	}

	@media (min-width: 860px) {
		.search input {
			max-width: 30rem;
		}
	}

</style>