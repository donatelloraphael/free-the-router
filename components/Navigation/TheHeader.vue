<template>
	<div>
		<section class="header navigation-bar-scroll">
	    <div class="pre-header">
	    	<nuxt-link to="/">
	    		<div class="logo"></div>
	    	</nuxt-link>

				<form  class="search" action="">
					<input class="search-box" type="text" placeholder="Search here">
					<button type="submit">Search</i></button>
				</form>
	    	<!-- <b-nav-form>
	      	<b-form-input class="mr-sm-1" placeholder="Search"></b-form-input>
	      	<b-button variant="outline-dark" class="my-2 my-sm-0" type="submit">Search</b-button>
	    	</b-nav-form> -->
				
				<nav class="navigation-items">
		      <ul class="nav-list pre-header navbar-nav mr-auto">
		      	<li class="nav-item dropdown">

		      		<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="dropdownToggle">
          			Country
        			</a>
        			<select class="dropdown-menu" :class="{ active: dropdownState }" v-model="selectedCountry"  @click="setCountry(selectedCountry)" aria-labelledby="navbarDropdown">
      					<option class="dropdown-item" value="india" href="#">India</option>
								<option class="dropdown-item" value="usa" href="#">USA</option>
								<option class="dropdown-item" value="canada" href="#">Canada</option>
								<option class="dropdown-item" value="uk" href="#">UK</option>
						</select>
						<span id="country-flag" :style="{ background: 'no-repeat center/100% ' + flagUrl }"/>
		      	
	      		<span class="divider">|</span>
		        <li class="nav-item"><nuxt-link class="nav-link" to="/signin">Sign In</nuxt-link></li>
		        <span class="divider">|</span>
		        <li class="nav-item"><nuxt-link class="nav-link" to="/register">Register</nuxt-link></li>
		        <span class="divider">|</span>
		        <li class="nav-item"><nuxt-link class="nav-link" to="/wishlist">Wishlist</nuxt-link></li>
		        <!-- <span class="divider">|</span>
		        <li class="nav-item"><nuxt-link class="nav-link" to="/account">Account</nuxt-link></b-nav-item></li> -->
		      </ul>
	   		</nav>

			

   		</div>
    
	    <nav class="navbar">
	    	<span class="menu__toggler" @click="toggleActive()" :class="{ active: isActive }" :is-active="isActive"><span></span></span>
	    	
	    	<ul class="navbar-list navbar-nav mr-auto">
	    		<li class="nav-item"><nuxt-link to="/" exact>Home</nuxt-link></li>
	        <li class="nav-item"><nuxt-link to="/shop">Shop</nuxt-link></li>
	        <li class="nav-item"><nuxt-link to="/deals">Deals</nuxt-link></li>
	        <li class="nav-item"><nuxt-link to="/supported-devices">Supported Devices</nuxt-link></li>
	        <li class="nav-item"><nuxt-link to="/resources">Resources</nuxt-link></li>
	        <li class="nav-item"><nuxt-link to="/help">Help</nuxt-link></li>
	    	</ul>
	    </nav>

	    	

  	</section>
  	
  	<app-sidenav @close="isActive = false" :is-active="isActive"></app-sidenav>

  
  </div>
</template>

<script>
	import TheSideNav from "@/components/Navigation/TheSideNav";

	export default {
		name: "TheHeader",
		data() {
			return {
				isActive: false,
				lastScrollTop: 0,
				dropdownState: false,
				selectedCountry: "india",
				flagUrl: ''
			}
		},
		components: {
			appSidenav: TheSideNav
		},
		methods: {
			toggleActive() {
				this.isActive = !this.isActive;
			},
			dropdownToggle() {
				this.dropdownState = !this.dropdownState;
				let vm = this;
				window.addEventListener("click", function(event) {
					vm.dropdownState = false;
					return;
				});
			},
			setCountry(country) {

				// webpack isn’t smart enough to understand that you want some part of some string in your code interpreted as a path that it should resolve. That works in HTML and CSS because of their static nature, but not inside of Javasript code. So you have to 'require' the path:

				this.flagUrl = `url(${require(`assets/images/country-flags/${this.selectedCountry}.png`)})`;
				console.log("this: ", country);
			}
		},
		mounted() {

			////////////////////Hide header when scrolling down and show it scrolling up/////////////////////////////

			let didScroll;

			// on scroll, let the interval function know the user has scrolled
			$(window).scroll(function(event){
			  didScroll = true;
			});

			// run hasScrolled() and reset didScroll status
			setInterval(function() {
			  if (didScroll) {
			    hasScrolled();
			    didScroll = false;
			  }
			}, 250);

			let vm = this._data;
			// console.log(vm);

			function hasScrolled() {
				var delta = 5;
				var navbarHeight =$('.header').outerHeight();
				var scrollPosition = $(window).scrollTop();

				if (Math.abs(vm.lastScrollTop  - scrollPosition) <= delta) {
  				return;
  			}

  			// If current position > last position AND scrolled past navbar...
				if (scrollPosition > vm.lastScrollTop && scrollPosition > navbarHeight) {  
					// Scroll Down
  				$('.header').removeClass('header-down').addClass('header-up');
  			} else {  
  				// Scroll Up
  				// If did not scroll past the document (possible on mac)...  
  					if(scrollPosition + $(window).height() < $(document).height()) { 
    					$('.header').removeClass('header-up').addClass('header-down');
  					}
				}

				vm.lastScrollTop = scrollPosition;
			}
			///////////////////////////Set country flag Url at start of the app///////////////////////////

			this.flagUrl = `url(${require(`assets/images/country-flags/${this.selectedCountry}.png`)})`;
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
    z-index: 10;
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

	.nav-list {
		list-style: none;
		display: flex;
		flex-direction: row;
	}
	
	.navigation-items .nav-item {
  	margin: 10px 10px;
  	padding: 0 0;
	}

	.nav-item a {
		text-decoration: none;
		color: black;
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
	}

	input.search-box {
		height: 2rem;
		width: 30vw;
		padding: 0 0 0 10px;
		border: 1px solid grey;
		border-right: none;
		border-radius: 5px 0 0 5px;
	}

	input.search-box:focus {
		border: 2px solid green;
	}

	.search button {
		background-color: white;
		padding: 0 5px;
		border: 1px solid grey;
		font-family: "Courier Prime", monospace;
		border-radius: 0 5px 5px 0;
	}

	.dropdown-toggle {
		display: inline-block;
	}

	#country-flag {
		width: 1.5rem;
		height: .9rem;
		position: absolute;
		top: -1rem;
		left: 1.5rem;
	}

	/**********************************Dropdown****************************************/
	
	.dropdown {
  	position: relative;
  	display: inline-block;
  	z-index: 100;
	}

	.dropdown-menu {
	  display: none;
	  position: absolute !important;
	  top: 2rem;
	  background-color: #f9f9f9;
	  font-family: "Courier Prime", monospace;
	  min-width: 160px;
	  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
	  z-index: 1000;
	  animation-name: country-dropdown;
		animation-duration: .3s;
	}

	.dropdown-menu.dropdown-item {
	  color: black;
	  padding: 12px 16px !important;
	  text-decoration: none;
	  display: block;
	}

	.dropdown-menu option:hover {
		background-color: #f1f1f1;
	}

	.dropdown-menu.show	{
		display: flex;
		flex-direction: column;
		align-items: space-between;
		height: auto;
	}

	@keyframes country-dropdown {
		from{opacity: 0}
		to{opacity: 100}
	}

	/****************************Dropdown in mobile view****************************/

	.nav-country-dropdown .dropdown-toggle {
		text-decoration: none;
		color: white;
		font-family: "Courier Prime", monospace;
		position: relative;
		right: 0;
		float:  right;
	}

	.nav-country-dropdown .dropdown-toggle:hover {
		color: green;
	}

	.dropdown-menu-2 a:hover {
		color: green;
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
		color: white;
		font-size: 1.1rem;
		padding: 0 2rem;
		display: inline-flex;
		align-items: center;
		/*background-color: red;*/
		height: 3rem;

	}

	.navbar-list a.active {
		color: #deff00;
		border-bottom: 4px solid #deff00;
	}

	.navbar-list a:hover {
		color: white;
		background-color: pink;
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

	

	/*************************************HEADER-TOGGLE***************************************/
	
	@media (max-width: 768px) {
		.navbar-list, .navigation-items {
			display: none;
		}
		
		.search {
			margin: auto;
		}

	}

	@media (min-width: 768px) {
		.menu__toggler	{
			display: none;
		}
		.search input {
			max-width: 10rem;
		}
	}

	@media (min-width: 860px) {
		.search input {
			max-width: 30rem;
		}
	}

</style>