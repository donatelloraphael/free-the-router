<template>
	<div>
		<section class="header">
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

		      		<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          			Country
        			</a>
        			<div class="dropdown-menu" aria-labelledby="navbarDropdown">
      					<a class="dropdown-item" href="#">India</a>
								<a class="dropdown-item" href="#">USA</a>
								<a class="dropdown-item" href="#">Canada</a>
								<a class="dropdown-item" href="#">UK</a>
							</div>
						</li>
		      	
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
	    	<span class="menu__toggler" @click="toggleMenu" :class="{ active: isActive }"><span></span></span>
	    	
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
  	<transition name="slide-side">
  		<app-sidenav v-if="isActive" @close="isActive = !isActive"></app-sidenav>
  	</transition>
	</div>
</template>

<script>
	import TheSideNav from "@/components/Navigation/TheSideNav";

	export default {
		name: "TheHeader",
		data() {
			return {
				isActive: false
			}
		},
		components: {
			appSidenav: TheSideNav
		},
		methods: {
			toggleMenu() {
				this.isActive = !this.isActive;
			}			
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
    display: grid;
    grid-template-areas: "hd1"
    										 "hd1"
                         "nav";
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
  	background: no-repeat center/100% url('../../assets/images/free-the-router.png');
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
	}

	.search button {
		background-color: white;
		padding: 0 5px;
		border: 1px solid grey;
		font-family: "Courier Prime", monospace;
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
	  min-width: 160px;
	  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
	  z-index: 1000;
	}

	.dropdown-menu a {
	  color: black;
	  padding: 12px 16px;
	  text-decoration: none;
	  display: block;
	}

	.dropdown-menu a:hover {
		background-color: #f1f1f1
	}

	.dropdown:hover .dropdown-menu {
	  display: flex;
	  flex-direction: column;
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
		.menu__toggler {
			display: none;
		}
	}

	/**********************************SIDE MENU TRANSITION**************************************/

	.slide-side-enter-active, .slide-side-leave-active {
  	transition: all 0.3s ease-out;
	}
	.slide-side-enter, .slide-side-leave-to {
  	transform: translateX(-100%);
	}
</style>