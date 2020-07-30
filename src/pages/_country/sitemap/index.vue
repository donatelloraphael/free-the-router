<template>
	<div class="container1">

		<div class="bg-left"></div>

		<div class="sitemap">
			<h1>Sitemap</h1>
			<ul>
				<li><nuxt-link :to="`/${$store.getters.getCountry}/`">Home</nuxt-link></li>
				<li><nuxt-link :to="`/${$store.getters.getCountry}/shop`">Shop</nuxt-link></li>
				<li><nuxt-link :to="`/${$store.getters.getCountry}/firmware`">Firmware</nuxt-link></li>
				<li><nuxt-link :to="`/${$store.getters.getCountry}/supported-devices`">Supported Devices</nuxt-link></li>
				<li><nuxt-link :to="`/${$store.getters.getCountry}/resources`">Resources</nuxt-link></li>
				<li><nuxt-link :to="`/${$store.getters.getCountry}/about`">About Us</nuxt-link></li>
			</ul>

			<ul>
				<li><nuxt-link :to="`/${$store.getters.getCountry}/firmware/#openwrt`" @click.native="scrollTo('#openwrt')">OpenWrt</nuxt-link></li>
				<li><nuxt-link :to="`/${$store.getters.getCountry}/firmware/#ddwrt`" @click.native="scrollTo('#ddwrt-')">DD-WRT</nuxt-link></li>
				<li><nuxt-link :to="`/${$store.getters.getCountry}/firmware/#gargoyle`" @click.native="scrollTo('#gargoyle-')">Gargoyle</nuxt-link></li>
				<li><nuxt-link :to="`/${$store.getters.getCountry}/firmware/#freshtomato`" @click.native="scrollTo('#freshtomato-')">FreshTomato</nuxt-link></li>
				<li><nuxt-link :to="`/${$store.getters.getCountry}/firmware/#advancedtomato`" @click.native="scrollTo('#advancedtomato-')">AdvancedTomato</nuxt-link></li>
				<li><nuxt-link :to="`/${$store.getters.getCountry}/firmware/#tomatobyshibby`" @click.native="scrollTo('#tomatobyshibby-')">Tomato by Shibby</nuxt-link></li>
				<li><nuxt-link :to="`/${$store.getters.getCountry}/firmware/#asuswrt-merlin`" @click.native="scrollTo('#asuswrt-merlin')">AsusWrt-Merlin</nuxt-link></li>
			</ul>

			<ul>
				<li><nuxt-link :to="{ path: `/${$store.getters.getCountry}/resources/#faq` }" @click.native="scrollTo('#faq')">FAQ</nuxt-link></li>
				<li><nuxt-link :to="{ path: `/${$store.getters.getCountry}/about/#terms` }" @click.native="scrollTo('#terms')">Terms of Service</nuxt-link></li>
				<li><nuxt-link :to="{ path: `/${$store.getters.getCountry}/about/#privacy` }" @click.native="scrollTo('#privacy')">Privacy Policy</nuxt-link></li>
				<li><nuxt-link :to="{ path: `/${$store.getters.getCountry}/about/#about` }" @click.native="scrollTo('#about')">About Us</nuxt-link></li>
				<li><nuxt-link :to="{ path: `/${$store.getters.getCountry}/about/#contact` }"  @click.native="scrollTo('#contact')">Contact Us</nuxt-link></li>
			</ul>
		</div>

		<div class="bg-right"></div>

	</div>
</template>

<script>
	const TIMEOUT = 1;

	export default {
		head: {
	    title: "Sitemap - Free The Router",
	    meta: [
	      { hid: 'description', name: 'description', content: 'Sitemap of freetherouter.com' }
	    ]
	  },
		methods: {
			scrollTo: function (hashtag) {
	      setTimeout(() => { location.href = hashtag }, TIMEOUT)
	    }
		}
	};
</script>

<style scoped>
	
	.container1 {
		width: 100%;
		min-height: 100vh;
	}

	.sitemap {
		padding: 10rem 3rem 10rem 5rem;
		width: 70%;
		height: 100%;
		display: inline-block;
		font-family: "Montserrat", sans-serif;
		font-size: 1rem;
		margin: auto;
	}

	ul {
		display: inline-block;
		vertical-align: top;
	}

	h1 {
		margin: 3rem auto;
		text-align: center;
	}

	ul {
		margin-left: 2rem;
	}

	li {
		padding: 10px 20px;
		margin-right: 50px; 
	}

	a {
		text-decoration: none;
		font-weight: bold;
		color: #2e3192;
	}

	.bg-left {
    background-color: #2e3192;
    padding: 8rem 0 0 0;
    height: 100vh;
    float: left;
    width: 150px;
    -webkit-box-shadow: 0px 0px 5px 2px rgba(120,120,120,1);
		-moz-box-shadow: 0px 0px 5px 2px rgba(120,120,120,1);
		box-shadow: 0px 0px 5px 2px rgba(120,120,120,1);
	}

	.bg-right {
    background-color: #2e3192;
    height: 100vh;
    width: 150px;
    padding: 8rem 0 0 0;
    float: right;
    -webkit-box-shadow: 0px 0px 5px 2px rgba(120,120,120,1);
		-moz-box-shadow: 0px 0px 5px 2px rgba(120,120,120,1);
		box-shadow: 0px 0px 5px 2px rgba(120,120,120,1);
	}

	@media (max-width: 1200px) {
		.bg-left, .bg-right {
			width: 50px;
			display: inline-block;
		}

		.sitemap {
			padding: 10rem 10px 20px 20px;
		}
	}

	@media (max-width: 789px) {
		.bg-left, .bg-right {
			display: none;
		}
	}

</style>