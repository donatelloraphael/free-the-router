<template>
	<div class="container">

		<div class="sidebar">
			
		</div>

		<div class="main-grid">
			<div class="heading">

			</div>
		
			<div class="product-grid">
				<div class="item">
				</div>
			</div>

			<div class="pagination">

			</div>

		</div>
		
		
	</div>
</template>

<script>
	
</script>

<style scoped>

	.container {
		width: 100%;
	  min-height: 100vh;
	  float: right;
		/*background-color: red;*/
	}

	.sidebar {
		width: 15%;
		height: 100%;
		position: absolute;
		z-index: 5;
		left: 0;
		background-color: #2e3192;
    box-shadow: 0px 0 10px rgba(0, 0, 0, 1);
	}

	.main-grid {
		width: 85%;
		height: 100%;
		position: relative;
		right: 0;
		float: right;
		background-color: pink;
	}

	.product-grid {
		min-height: 100%;
		width: 100%;
		position: relative;
		top: 8rem;
		background-color: cyan;
	}

	.heading {
		position: relative;
		top: 8rem;
		background-color: blue;
		height: 5rem;
		width: 100%;
	}

	.pagination {
		position: relative;
		bottom: 0;
		background-color: green;
		height: 10vh;
		width: 100%;
	}

	.item {
		height: 1200px;
		width: 400px;
		color: yellow;
	}
</style>