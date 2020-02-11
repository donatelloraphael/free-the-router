<template>
  <div>

    <div class="sidenav-backdrop" @click="closeSideMenu">
    </div>

   <div class="menu active" :class="{ open: isOpen }" @click="closeSideMenu">
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
    props: ["isOpen"],
    methods: {
      closeSideMenu() {
        this.$emit("close");
      }
    }
  };
</script>

<style>
  .menu {
    position: fixed;
    z-index: 998;
    width: 50vw;
    height: 100vh;
    min-width: 250px;
    padding: 50px;
    display: flex;
    flex-direction: column;
    background-color: #2e3192;
    overflow-y: scroll;

    -webkit-transition: all .3s ease-in-out;
    -moz-transition: all .3s ease-in-out;
    -o-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
    -webkit-animation: scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) 0ms both;
    animation: scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) 0ms both;
  }

  .open {
    -webkit-transform: translate3d(0px, 0px, 0px);
    transform: translate3d(0px, 0px, 0px);
    -webkit-animation: scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) 0ms both;
    animation: scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) 0ms both;
  }

  .sidenav-backdrop {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    z-index: 20;
    position: fixed;
    top: 0;
    left: 0;
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