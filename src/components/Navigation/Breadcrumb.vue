<template>
	<div class="breadcrumb-container">
		<nav> <!--To provide navigation links-->
			<ol class="breadcrumb " itemscope itemtype="http://schema.org/BreadcrumbList">
				
				<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
					<span itemprop="item">
						<span itemprop="name"><nuxt-link to="/">Home</nuxt-link></span>
					</span>
					<meta itemprop="position" content="1" />
				</li>
				
				<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
					<span itemprop="item">
						<span itemprop="name"><nuxt-link :to="{ path: '/shop', query: { category: queryCategory }}">{{ category }}</nuxt-link></span>
					</span>
					<meta itemprop="position" content="2" />
				</li>
				
				<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
					<span itemprop="item" href="#">
						<span itemprop="name"><nuxt-link :to="{ path: '/shop', query: { brand: brand } }">{{ brand }}</nuxt-link></span>
					</span>
					<meta itemprop="position" content="3" />
				</li>
				
				<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
					<a itemprop="item" href="#"> 
						<span itemprop="name">{{ name }}</span>
					</a>
					<meta itemprop="position" content="4" />
				</li>
		
			</ol>
		</nav>	
	</div>

</template>

<script>
	export default {
		name: "Breadcrumb",

		props: ["category", "brand", "name", "queryCategory"]
	};

</script>

<style scoped>

.breadcrumb {
  list-style-type: none;
  padding: 0;
  margin-left: 20px;
  font-family: "Montserrat", sans-serif;
  line-height: 2;
  font-size: 0.9rem;
  margin-bottom: 50px;
}

li {
  display: inline-block;
  position: relative;
  margin-right: 5px;
}
li:last-child a {
  cursor: default;
  color: #2e3192;
}
li:last-child::before, li:last-child::after {
  background: white;
}
li:not(:last-child):hover::before, li:not(:last-child):hover::after {
  background: #deff00;
}
li::before, li::after {
  content: '';
  position: absolute;
  left: 0;
  height: 50%;
  width: 100%;
  background: #2e3192;
  border-left: 2px solid #2e3192;
  border-right: 2px solid #2e3192;
  z-index: -2;
}
li::before {
  top: -2px;
  transform: skew(30deg);
  border-top: 2px solid #2e3192;
}
li::after {
  bottom: -2px;
  transform: skew(-30deg);
  border-bottom: 2px solid #2e3192;
}

a {
  display: inline-block;
  position: relative;
  padding: 0 10px;
  color: white;
  text-decoration: none;
}

a:hover {
	color: black;
}

li:first-child {
  background-color: #2e3192;
  border-left: 2px solid #2e3192;
  left: -5px;
  box-sizing: content-box;
}
li:first-child:hover {
  background-color: #deff00;
  color: black;
}
li:first-child::before, li:first-child::after {
  left: 5px;
}

@media (max-width: 789px) {
	.breadcrumb {
		margin: 0 0 0 8px;
		font-size: 0.8rem;
	}

	li {
		margin-right: 3px;
	}
}


</style>