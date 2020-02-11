<template>
  <div>

    <div class="sidenav-backdrop" @click="closeSideMenu">
    </div>
    
    <div class="menu" @click="closeSideMenu">
      <nuxt-link to="/"><span>Home</span></nuxt-link>
      <nuxt-link to="/signin"><span>Sign In</span></nuxt-link>
      <nuxt-link to="/register"><span>Register</span></nuxt-link>
      <nuxt-link to="/shop"><span>Shop</span></nuxt-link>
      <nuxt-link to="/deals"><span>Deals</span></nuxt-link>
      <nuxt-link to="/wishlist"><span>Wishlist</span></nuxt-link>
      <nuxt-link to="/supported-devices"><span>Supported Devices</span></nuxt-link>
      <nuxt-link to="/resources"><span>Resources</span></nuxt-link>
      <nuxt-link to="/help"><span>Help</span></nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TheSideNav",
    methods: {
      closeSideMenu() {
        this.$emit("close");
      }
    }
  };
</script>

<style scoped>
  .menu {
    position: fixed;
    left: 0;
    z-index: 998;
    width: 50vw;
    height: 100vh;
    min-width: 250px;
    padding: 50px;
    display: flex;
    flex-direction: column;
    background-color: #2e3192;
    overflow-y: auto;
    animation-name: nav-slide;
    animation-duration: .7s;
  }

  @keyframes nav-slide {
    from{left: -50vw;}
    to {left: 0;}
  }

  .sidenav-backdrop {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 20;
    position: fixed;
  }
    
  .menu span{
    font-size: 1.2rem;
    font-family: "Courier Prime", monospace;
    color: white;
    display: block;
    padding: 10px;
    border-radius: 5px;    
  }

  .menu span:hover{
    background-color: #0b0e85;
  }

  .menu a{
    text-decoration: none;
  }

</style>