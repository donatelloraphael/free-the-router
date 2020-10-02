<template>
	<div class="top-container">
		<div class="container">
			<svg alt="Error exclaimation" width="200" height="200" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 9a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0v4a1 1 0 0 1-1 1zm0 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>
			<h1>Error! Page not found!</h1>
			<p>Go back to <nuxt-link :to="`/${$store.getters.getCountry}/`">Home</nuxt-link></p>
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

	svg {
		margin-top: 15rem;
	}

	svg, h1, h2, p {
		width: 100%;
		padding-bottom: 2rem;
		text-align: center;
		color: black;
	}

</style>