<template>

	<section class="header">
    <div class="pre-header">
    	<nuxt-link to="/">
    		<div class="logo"></div>
    	</nuxt-link>

    	<b-nav-form>
      	<b-form-input class="mr-sm-2" placeholder="Search"></b-form-input>
      	<b-button variant="outline-success" class="my-2 my-sm-0" type="submit">Search</b-button>
    	</b-nav-form>
			
			<div class="navigation-items">
	      <ul class="nav-list">
	      	<b-nav-item-dropdown text="Country" right>
		        <b-dropdown-item href="#">India</b-dropdown-item>
		        <b-dropdown-item href="#">USA</b-dropdown-item>
		        <b-dropdown-item href="#">Canada</b-dropdown-item>
		        <b-dropdown-item href="#">UK</b-dropdown-item>
      		</b-nav-item-dropdown>
	        <b-nav-item><nuxt-link to="/signin">Sign In</nuxt-link></b-nav-item>
	        <b-nav-item><nuxt-link to="/signup">Sign Up</nuxt-link></b-nav-item>
	        <b-nav-item><nuxt-link to="/wishlist">Wishlist</nuxt-link></b-nav-item>
	        <b-nav-item><nuxt-link to="/account">Account</nuxt-link></b-nav-item>
	      </ul>
   		</div>
			

    </div>
    <div class="navbar">
         
    </div>
  </section>
	
</template>

<script>

	export default {
		name: "TheHeader"
	};

</script>

<style>
	
	.header {
    grid-area: header;
    width: 100%;
    height: 8rem;
    border: 1px solid black;
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

  .navbar {
    grid-area: nav;
    display: flex;
    background-color: #2e3192;
    height: 3rem;
  }

  .logo {
  	height: 4em;
  	width: 6em;
  	background: no-repeat center/100% url('../../assets/images/free-the-router.png');
  	margin: 10px;
  }

	.nav-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
	}

	.nav-item {
  	margin: 0;
  	padding: 0;
	}

	.nav-item a {
		text-decoration: none;
		color: black;
	}

	.nav-item a:hover {
		color: green;
	}

</style>