<template>
	<footer>
		<div class="main-footer" :style="{ top: documentHeight + 'px', display: displayFooter }">
			

		</div>
		<div class="sub-footer" :style="{ top: subFooterPosition + 'px', display: displayFooter }">
			<p>Copyright &copy; Free The Router | All Rights Reserved</p>
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
		beforeMount() {

				/////////////////////////Hacked Up solution to footer not being positioned at bottom////////////////////////

				this.documentHeight = ($(document).height()) - convertRemToPixels(7);

				function convertRemToPixels(rem) {    
    			return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    		}

    		///////////////////////Sub-footer////////////////////////////////////////

    		this.subFooterPosition = this.documentHeight + convertRemToPixels(15);

				/////////////////////////Don't show footer and sub-footer covering header when loading page///////////////////////////

				setTimeout(() => {
					this.displayFooter = "flex";
				}, 200);
		}
	};
</script>

<style scoped>

	.main-footer {
		width: 100%;
		background-color: #2e3192;
		position: absolute;
		z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    height:15rem;
    clear: both;
	}



	/*******************Sub-Footer**********************/
	
	.sub-footer {
		width: 100%;
		background-color: #e1e1e1;
		height: 2rem;
		position: absolute;
		z-index: 10;
		font-family: "Courier Prime", monospace;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 5px;
	}

</style>