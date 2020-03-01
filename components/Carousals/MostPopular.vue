<template>
	
</template>

<script>
	export default {
		name: "MostPopular",
		props: ["mostPopular"],
		mounted() {
			console.log("most popular: ", this.mostPopular);
		}
	};
</script>