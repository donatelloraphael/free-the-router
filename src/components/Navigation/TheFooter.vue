<template>
	<footer>

		<div class="main-footer">

			<span class="logo">
				<nuxt-link to="/"><img src="../../assets/images/free-the-router.png" alt="Free The Router Logo linking to homepage"></nuxt-link>
			</span>

			<div class="firmware">
				<h3>Firmware</h3>
				<nuxt-link to="/firmware/#openwrt" @click.native="scrollTo('#openwrt')">OpenWrt</nuxt-link>
				<nuxt-link to="/firmware/#ddwrt" @click.native="scrollTo('#ddwrt')">DD-Wrt</nuxt-link>
				<nuxt-link to="/firmware/#gargoyle" @click.native="scrollTo('#gargoyle')">Gargoyle</nuxt-link>
				<nuxt-link to="/firmware/#freshtomato" @click.native="scrollTo('#freshtomato')">FreshTomato</nuxt-link>
				<nuxt-link to="/firmware/#advancedtomato" @click.native="scrollTo('#advancedtomato')">AdvancedTomato</nuxt-link>
				<nuxt-link to="/firmware/#tomatobyshibby" @click.native="scrollTo('#tomatobyshibby')">Tomato by Shibby</nuxt-link>
			</div>

			<div class="info">
				<h3>Information</h3>
				<nuxt-link to="/resources/#faq" @click.native="scrollTo('#faq')">FAQ</nuxt-link>
				<nuxt-link to="/about/#terms" @click.native="scrollTo('#terms')">Terms of Service</nuxt-link>
				<nuxt-link to="/about/#privacy" @click.native="scrollTo('#privacy')">Privacy Policy</nuxt-link>
				<nuxt-link to="/resources/#resources" @click.native="scrollTo('#resources')">Resources</nuxt-link>
			</div>

			<div class="more">
				<h3>Know More</h3>
				<nuxt-link to="/about/#about" @click.native="scrollTo('#about')">About Us</nuxt-link>
				<nuxt-link to="/about/#contact" @click.native="scrollTo('#contact')">Contact Us</nuxt-link>
				<!-- <nuxt-link to="/paid-verification">Paid Verification</nuxt-link>
				<nuxt-link to="/brands">Brands</nuxt-link>
				<nuxt-link to="/sitemap">Sitemap</nuxt-link> -->
			</div>

			<div id="placeholder-block">
			</div>

			<div class="sub-footer">
				<p>Copyright &copy; Free The Router | All Rights Reserved</p>
			</div>

		</div>
		
	</footer>
</template>	

<script>
	const TIMEOUT = 1;

	export default {
		name: "TheFooter",
		methods: {
			scrollTo: function (hashtag) {
	      setTimeout(() => { location.href = hashtag }, TIMEOUT)
	    }
		}
	};
</script>

<style scoped>

	.main-footer {
		width: 100%;
		height: auto;
		background-color: #2e3192;
		position: relative;
		z-index: 6;
    bottom: 0;
    left: 0;
    right: 0;
    clear: both;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    /*border-top: 1px solid black;*/
    box-shadow: 0px 0 10px rgba(0, 0, 0, 1);
	}

	.main-footer span {
		margin-left: 40px;
	}

	.main-footer div {
		margin: 0;
		padding: 20px;
	}

	.logo {
		grid-area: logo;
		position: relative;
		z-index: 11;
		background-color: red;
		height: auto;
		padding: 50px 40px;
	}

	.logo img {
		width: 13rem;
		height: 9rem;
		margin: auto;
	}

	.main-footer h3 {
		font-family: "Courier Prime", monospace;
		color: white;
		padding: 1rem 0 0 0;
		margin: 10px 0;
	}

	.main-footer a {
		text-decoration: none;
		color: white;
		font-family: "Courier Prime", monospace;
		padding: 4px 0;
	}

	.main-footer a:hover {
		color: red;
	}

	.firmware {
		display: flex;
		flex-direction: column;
	}

	.info {
		display: flex;
		flex-direction: column;
	}

	.more {
		display: flex;
		flex-direction: column;
	}


	/*******************Sub-Footer**********************/
	
	.sub-footer {
		width: 100%;
		background-color: #e1e1e1;
		height: 3rem;
		z-index: 10;
		font-family: "Courier Prime", monospace;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.sub-footer p {
		padding-top: 3px;
	}

	@media (max-width: 600px) {
		.main-footer div {
			padding-left: 100px;
			margin: 0;
		}
		.sub-footer {
			height: auto;
		}
	}

</style>