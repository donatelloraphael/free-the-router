<template>
  <div>

    <div class="sidenav-backdrop" @click="closeSideMenuStateChanges() " :class="{ closing: closingState, closed: setClosingState() }">
    </div>
    
    <div class="menu" :class="{ active: isActive, closing: closingState, shopPage: isShopPage, closed: setClosingState() }">
      <nuxt-link to="/"><span @click="closeSideMenuStateChanges()">Home</span></nuxt-link>
      <nuxt-link to="/signin"><span @click="closeSideMenuStateChanges()">Sign In</span></nuxt-link>
      <nuxt-link to="/register"><span @click="closeSideMenuStateChanges()">Register</span></nuxt-link>
      <nuxt-link to="/shop"><span @click="closeSideMenuStateChanges()">Shop</span></nuxt-link>
      <nuxt-link to="/firmware"><span @click="closeSideMenuStateChanges()">Firmware</span></nuxt-link>
      <nuxt-link to="/wishlist"><span @click="closeSideMenuStateChanges()">Wishlist</span></nuxt-link>
      <nuxt-link to="/supported-devices"><span @click="closeSideMenuStateChanges()">Supported Devices</span></nuxt-link>
      <nuxt-link to="/resources"><span @click="closeSideMenuStateChanges()">Resources</span></nuxt-link>
      <nuxt-link to="/about"><span @click="closeSideMenuStateChanges()">About Us</span></nuxt-link>

    </div>
  </div>
</template>

<script>
  export default {
    name: "TheFilterMenu",
    data() {
      return {
        closedState: false,
        closingState: false,
      }
    },
    props: ["isActive"],
    computed: {
      isShopPage() {
        return "/shop" == this.$route.path;
      }
    },
    methods: {
      closeSideMenu() {
        this.$emit("close");       
      },
      toggleClosingState() {
        const vm = this;
        setTimeout(() => {
          vm.closingState = false;
        }, 500);
      },
      toggleClosedState() {
        const vm = this;
        setTimeout(() => {
          return vm.isActive;
        }, 500);
      },
      setClosingState() {
        return !this.isActive && !this.closingState;
      },
      closeSideMenuStateChanges() {
        this.closingState = true; 
        this.closeSideMenu(); 
        this.toggleClosingState(); 
        this.toggleClosedState();
      }
    }
  };
</script>

<style scoped>
  .menu {
    position: fixed;
    z-index: 40;
    display: none;
    left: 0;
    min-width: auto;
    height: 100vh;
    padding: 10rem 1rem 2rem 1rem;
    flex-direction: column;
    background-color: #2e3192;
    overflow-y: auto;
    animation-duration: .5s;
    box-shadow: 0px 0 10px rgba(0, 0, 0, 1);
  }

  .menu.shopPage.active {
    display: flex;
    animation-name: nav-slide;
  }

  .menu.closing {
    animation-name: nav-slide-out;
    animation-duration: .5s;
    display: flex;
  }

  @keyframes nav-slide {
    from{left: -50vw;}
    to{left: 0;}
  }

  @keyframes nav-slide-out {
    from{left: 0;}
    to{left: -50vw;}
  }

  .sidenav-backdrop {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 20;
    position: fixed;
    animation-name: backdrop-show;
    animation-duration: .5s;
  }

  .sidenav-backdrop.closing {
    animation-name: backdrop-fade;
    animation-duration: .5s;
  }

  @keyframes backdrop-show {
    from{opacity: 0}
    to{opacity: 100}
  }

  @keyframes backdrop-fade {
    from{opacity: 100}
    to{opacity: 0}
  }

  .sidenav-backdrop.closed {
    display: none;
  }
    
  .menu span{
    font-size: 1.2rem;
    font-family: "Courier Prime", monospace;
    color: white;
    display: block;
    padding: 10px;
    border-radius: 5px;
    cursor: ponter;
  }

  .menu span:hover{
    background-color: #0b0e85;
  }

  .menu a{
    text-decoration: none;
  }

  /******************MEDIA QUERYS*********************/
  @media (max-width: 768px) {

    .menu.closed {
      display: none;
    }
  }

  @media (min-width: 769px) {

    .menu.shopPage {
      display: flex;
    }
  }

</style>