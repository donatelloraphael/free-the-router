<template>
	<div class="top-container">
		<div class="container">
			<i class="fas fa-exclamation-triangle"></i>
			<h1>Error! Page not found!</h1>
			<h2>Website is still under construction!</h2>
			<p>Go back to <nuxt-link :to="/$store.getters.getCountry/">Home</nuxt-link></p>
		</div>
	</div>
</template>

<style scoped>

	.top-container {
		min-height: 100vh;
		width: 100%;
	}
	
	.container {
		width: 60%;
		min-height: 20rem;
		padding: 30rem auto;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	i {
		margin-top: 15rem;
	}

	i, h1, h2, p {
		width: 100%;
		padding-bottom: 2rem;
		text-align: center;
		color: black;
	}

	i {
		font-size: 6rem;
	}

</style>