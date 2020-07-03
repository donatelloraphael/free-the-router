<template>
	<div class="card">
		<nuxt-link to="#">
			<div class="">
			{{ device.name }}
		</div>
		</nuxt-link>
	</div>


</template>

<script>

export default {
	name: "ShopCard",
	props: ["device"] 
};
	
</script>

<style scoped>
	
	.card {
		height: 100%;
		width: 100%;
	}

	/*.card {
		height: 100%;
		width: 100%;
	}*/



</style>