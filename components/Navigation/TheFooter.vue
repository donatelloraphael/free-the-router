<template>
	<footer>

		<div class="main-footer" :style="{ top: documentHeight + 'px', display: displayFooter }">

			<span class="logo">
				<nuxt-link to="/"><img src="../../assets/images/free-the-router.png" alt="Free The Router Logo linking to homepage"></nuxt-link>
			</span>

			<div class="firmware">
				<h3>Firmware</h3>
				<nuxt-link to="/firmware/openwrt">OpenWrt</nuxt-link>
				<nuxt-link to="/firmware/dd-Wrt">DD-Wrt</nuxt-link>
				<nuxt-link to="/firmware/gargoyle">Gargoyle</nuxt-link>
				<nuxt-link to="/firmware/fresh-tomato">FreshTomato</nuxt-link>
				<nuxt-link to="/firmware/advanced-tomato">AdvancedTomato</nuxt-link>
				<nuxt-link to="/firmware/tomato-shibby">Tomato by Shibby</nuxt-link>
			</div>

			<div class="info">
				<h3>Information</h3>
				<nuxt-link to="/faq">FAQ</nuxt-link>
				<nuxt-link to="/terms">Terms of Service</nuxt-link>
				<nuxt-link to="/resources">Resources</nuxt-link>
				<nuxt-link to="/brands">Brands</nuxt-link>
			</div>

			<div class="more">
				<h3>Know More</h3>
				<nuxt-link to="/aboutus">About Us</nuxt-link>
				<nuxt-link to="/contact">Contact Us</nuxt-link>
				<nuxt-link to="/paid-verification">Paid Verification</nuxt-link>
				<nuxt-link to="/sitemap">Sitemap</nuxt-link>
			</div>

			<div id="placeholder-block">
			</div>

			<div class="sub-footer" :style="{ top: subFooterPosition + 'px', display: displayFooter }">
				<p>Copyright &copy; Free The Router | All Rights Reserved</p>
			</div>

		</div>
		
	</footer>
</template>	

<script>
	

	export default {
		name: "TheFooter",
		data() {
			return {
				documentHeight: 0,
				subFooterPosition: 0,
				displayFooter: "none"
			}
		},
		mounted() {

				////////////Fucked up hack to footer not being positioned at bottom///////////////

				this.documentHeight = ($(document).height()) - convertRemToPixels(7) + 400;

				function convertRemToPixels(rem) {    
    			return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    		}

    		///////////////////////Sub-footer////////////////////////////////////////

    		this.subFooterPosition = this.documentHeight + convertRemToPixels(15) + 400;

				/////////////Don't show footer and sub-footer covering header when loading page////////////////

				setTimeout(() => {
					this.displayFooter = "flex";
				}, 200);
	
				// /////////////////Change sub-footer height accoring to media queries//////////////////////
				// if (window.matchMedia("(max-width: 711px)").matches) {
				// 	this.subFooterPosition += convertRemToPixels(30); 
				// 	console.log(this.subFooterPosition);
				// }
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
    top: 0;
    left: 0;
    right: 0;
    height:auto;
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
		display: block;
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

	/*@media (max-width: 964px) {
		main-footer div.more {
			padding: auto 50px;
		}
	}*/

</style>